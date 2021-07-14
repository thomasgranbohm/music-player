import { spotifyInstance } from "./api";

const { OFFLINE } = process.env;
console.log("OFFLINE", OFFLINE)

export const makeSpotifyRequest = async (url, cookie) => {
	try {
		const resp = await spotifyInstance.get(url, {
			headers: {
				Authorization: `Bearer ${cookie["access_token"]}`,
			},
		});

		return resp.data;
	} catch (error) {
		console.log(error);

		// if (
		// 	error.isAxiosError &&
		// 	error.response.data.error.message === "The access token expired"
		// ) {
		// 	await nextInstance.get("/spotify/refresh", {

		// 	});
		// 	return makeSpotifyRequest(url, cookie);
		// }

		return { error: true };
	}
};

export const getAlbums = async (cookie, offset = 0) =>
	OFFLINE
		? require("../../samples/albums.json")
		: makeSpotifyRequest(`/me/albums?offset=${offset}`, cookie);

export const getPlaylists = async (cookie, offset = 0) =>
	OFFLINE
		? require("../../samples/playlists.json")
		: makeSpotifyRequest(`/me/playlists?offset=${offset}`, cookie);

export const getArtistStatistics = async (
	cookie,
	{ offset = 0, range = "medium_term" }
) =>
	OFFLINE
		? require("../../samples/top-artists.json")
		: makeSpotifyRequest(
				`/me/top/artists?time_range=${range}&offset=${offset}&limit=25`,
				cookie
		  );

export const getTrackStatistics = async (
	cookie,
	{ offset = 0, range = "medium_term" }
) =>
	OFFLINE
		? require("../../samples/top-tracks.json")
		: makeSpotifyRequest(
				`/me/top/tracks?time_range=${range}&offset=${offset}&limit=25`,
				cookie
		  );

export const getAlbum = async (cookie, id) => {
	const [album, tracks] = await Promise.all([
		OFFLINE
			? require("../../samples/album.json")
			: makeSpotifyRequest(`/albums/${id}`, cookie),
		OFFLINE
			? require("../../samples/album-tracks.json")
			: makeSpotifyRequest(`/albums/${id}/tracks`, cookie),
	]);

	album.tracks = { ...album.tracks, ...tracks };

	return album;
};

export const getArtist = async (cookie, id) => {
	const [artist, albums, related, tracks] = await Promise.all([
		OFFLINE ? require("../../samples/artist.json") : makeSpotifyRequest(`/artists/${id}?market=from_token`, cookie),
		OFFLINE ? require("../../samples/artist-albums.json") : makeSpotifyRequest(`/artists/${id}/albums?market=from_token`, cookie),
		OFFLINE ? require("../../samples/artist-related-artists.json") : makeSpotifyRequest(`/artists/${id}/related-artists?market=from_token`, cookie),
		OFFLINE ? require("../../samples/artist-top-tracks.json") : makeSpotifyRequest(`/artists/${id}/top-tracks?market=from_token`, cookie),
	]);

	return {
		...artist,
		albums,
		related: related.artists,
		top: tracks.tracks,
	};
};
