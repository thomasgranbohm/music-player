import { Router } from 'express';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import qs from 'qs';

const {
	CLIENT_ID,
	CLIENT_SECRET,
	JWT_SECRET
} = process.env;

let dev = process.env.NODE_ENV == "development"

console.log(`Redirecting to ${dev ? "http://localhost:3000" : "https://dev.yommail.tk"}`)

const router = Router();

let makeSpotifyRequest = async (uri, token) => {
	let decoded = await jwt.verify(token, JWT_SECRET);
	let resp = await axios.get(uri, {
		headers: {
			'Authorization': `Bearer ${decoded.access_token}`
		}
	})
	return resp;
}

// TODO use sessions instead.....

let handleError = (res, err) => {
	console.log("Got error! Error Name: %s", err.name)
	if (err.name == 'TokenExpiredError')
		res.cookie().status(500).send(err)
	else
		res.status(500).send(err)
}

router.get('/login', (req, res) => {
	const scopes = 'user-read-private user-read-email user-library-read streaming user-top-read';
	res.redirect('https://accounts.spotify.com/authorize' +
		'?response_type=code' +
		'&client_id=' + CLIENT_ID +
		(scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
		'&redirect_uri=' + encodeURIComponent(`${dev ? "http://localhost:3000" : "https://dev.yommail.tk"}/api/authToAccess`));
})

router.get('/authToAccess', async (req, res) => {
	let { code, error } = req.query;
	if (error)
		return res.status(401).send(error);
	else if (!code)
		return res.redirect('/login');
	try {
		let resp = await axios.post('https://accounts.spotify.com/api/token',
			qs.stringify({
				'grant_type': 'authorization_code',
				code: code,
				'redirect_uri': `${dev ? "http://localhost:3000" : "https://dev.yommail.tk"}/api/authToAccess`,
			}), {
			headers: {
				'Authorization': 'Basic ' + Buffer.from(CLIENT_ID + ":" + CLIENT_SECRET).toString("base64"),
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		})
		const { access_token } = resp.data;
		const token = await jwt.sign({ access_token }, JWT_SECRET, { expiresIn: "1h" });
		res.cookie("token", token).redirect('/')
	} catch (err) {
		console.error(err)
		res.redirect('/login')
	}
})

router.get('/getAccessToken', async (req, res) => {
	const { token } = req.cookies;
	let decoded = await jwt.verify(token, JWT_SECRET);
	res.send(decoded.access_token);
})

router.get('/album', async (req, res) => {
	const { token } = req.cookies;
	const { id } = req.query;
	if (!id)
		return res.status(400).send("No id provided.")

	try {
		let resp = await makeSpotifyRequest(`https://api.spotify.com/v1/albums/${id}`, token);
		let album = resp.data;
		// resp = await makeSpotifyRequest(`https://api.spotify.com/v1/albums/${id}/tracks`, token);
		// album.tracks = resp.data;
		res.send(album)
	} catch (err) {
		handleError(res, err);
	}

})

router.get('/artist', async (req, res) => {
	const { token } = req.cookies;
	const { id } = req.query;
	const offset = req.query.offset || 0;
	if (!id)
		return res.status(400).send("No id provided.")

	try {
		let resp = await makeSpotifyRequest(`https://api.spotify.com/v1/artists/${id}?country=SE`, token);
		let artist = resp.data;
		let albums = await makeSpotifyRequest(`https://api.spotify.com/v1/artists/${id}/albums?country=SE`, token);
		artist.albums = albums.data.items.filter((thing, index, self) =>
			index === self.findIndex((t) => (t.name === thing.name))
		)
		let topTracks = await makeSpotifyRequest(`https://api.spotify.com/v1/artists/${id}/top-tracks?country=from_token`, token);
		artist.topTracks = topTracks.data.tracks.map((obj, i) => ({ ...obj, track_number: (i + 1) }));
		res.send(artist)
	} catch (err) {
		handleError(res, err);
	}
})

router.get('/saved', async (req, res) => {
	const { token } = req.cookies;
	const type = req.query.type || 'tracks';
	const offset = req.query.offset || 0;
	if (!['tracks', 'albums', 'shows'].includes(type))
		return res.status(400).send();

	try {
		let resp = await makeSpotifyRequest(`https://api.spotify.com/v1/me/${type}?limit=32&offset=${offset}`, token);
		res.send(resp.data)
	} catch (err) {
		handleError(res, err);
	}
})

router.get('/top', async (req, res) => {
	const { token } = req.cookies;
	const type = req.query.type || 'all';
	const time_range = req.query.time_range || 'short_term';

	let toReturn = {
		tracks: [],
		artists: []
	};

	if (type == 'tracks' || type == 'all') {
		try {
			let resp = await makeSpotifyRequest(`https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=${time_range}`, token)
			toReturn.tracks = resp.data.items;
		} catch (err) {
			return handleError(res, err);
		}
	}

	if (type == 'artists' || type == 'all') {
		try {
			let resp = await makeSpotifyRequest(`https://api.spotify.com/v1/me/top/artists?limit=50&time_range=${time_range}`, token)
			toReturn.artists = resp.data.items;
		} catch (err) {
			return handleError(res, err);
		}
	}

	res.send(toReturn)
})

router.get('/playlist', async (req, res) => {
	const { token } = req.cookies;
	const all = req.query.all || false;
	const id = req.query.id || undefined;
	const offset = req.query.offset || 0;

	try {
		if (all) {
			let resp = await makeSpotifyRequest('https://api.spotify.com/v1/me/playlists', token);
			res.send(resp.data);
		} else {
			let resp = await makeSpotifyRequest(`https://api.spotify.com/v1/playlists/${id}`, token);
			let playlist = resp.data;
			resp = await makeSpotifyRequest(`https://api.spotify.com/v1/playlists/${id}/tracks?limit=32&offset=${offset}`, token);
			playlist.tracks = resp.data;
			res.send(playlist);
		}
	} catch (err) {
		handleError(res, err);
	}
})

export default router;