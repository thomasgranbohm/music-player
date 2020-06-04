import { Router } from 'express';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import qs from 'qs';

const {
	CLIENT_ID,
	CLIENT_SECRET,
	JWT_SECRET
} = process.env;

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

router.get('/login', (req, res) => {
	const scopes = 'user-read-private user-read-email user-library-read';
	res.redirect('https://accounts.spotify.com/authorize' +
		'?response_type=code' +
		'&client_id=' + CLIENT_ID +
		(scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
		'&redirect_uri=' + encodeURIComponent('http://localhost:3000/api/authToAccess'));
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
				'redirect_uri': 'http://localhost:3000/api/authToAccess',
			}), {
			headers: {
				'Authorization': 'Basic ' + Buffer.from(CLIENT_ID + ":" + CLIENT_SECRET).toString("base64"),
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		})
		const { access_token } = resp.data;
		const token = await jwt.sign({ access_token }, JWT_SECRET, { expiresIn: "1h" });
		return res.cookie("token", token).redirect('/')
	} catch (err) {
		console.error(err)
		res.redirect('/login')
	}
})

router.get('/album', async (req, res) => {
	const { token } = req.cookies;
	const { id } = req.query;
	if (!id)
		return res.status(400).send("No id provided.")

	try {
		let resp = await makeSpotifyRequest(`https://api.spotify.com/v1/albums/${id}`, token);
		res.send(resp.data)
	} catch (err) {
		if (err.response.data.error.message == 'The access token expired')
			console.log("Gotta refresh token")
		else
			console.error(err.response.data)
		res.status(500).send(err)
	}

})

router.get('/artist', async (req, res) => {
	const { token } = req.cookies;
	const { id } = req.query;
	if (!id)
		return res.status(400).send("No id provided.")

	try {
		let resp = await makeSpotifyRequest(`https://api.spotify.com/v1/artists/${id}`, token);
		let artist = resp.data;
		let albums = await makeSpotifyRequest(`https://api.spotify.com/v1/artists/${id}/albums`, token);
		artist.albums = albums.data.items;
		let topTracks = await makeSpotifyRequest(`https://api.spotify.com/v1/artists/${id}/top-tracks?country=from_token`, token);
		artist.topTracks = topTracks.data.tracks;
		res.send(artist)
	} catch (err) {
		if (err.response.data.error.message == 'The access token expired')
			console.log("Gotta refresh token")
		else
			console.error(err.response.data)
		res.status(500).send()
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
		if (err.response.data.error.message == 'The access token expired')
			console.log("Gotta refresh token")
		else
			console.error(err.response.data)
		res.status(500).send(err)
	}
})

router.get('/playlist', async (req, res) => {
	const { token } = req.cookies;
	const all = req.query.all || false;
	const id = req.query.playlistID || undefined;
	let url = undefined;

	if (all)
		url = 'https://api.spotify.com/v1/me/playlists';
	else
		url = `https://api.spotify.com/v1/playlists/${id}`

	try {
		let resp = await makeSpotifyRequest(url, token);
		res.send(resp.data)
	} catch (err) {
		if (err.response.data.error.message == 'The access token expired')
			console.log("Gotta refresh token")
		else
			console.error(err.response.data)
		res.status(500).send(err)
	}
})

export default router;