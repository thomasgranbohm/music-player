import { spotifyInstance } from "./api";

const { STATE } = process.env;

export const makeSpotifyRequest = async (url, cookie, useMarket = true) => {
	try {
		const resp = await spotifyInstance.get(url, {
			headers: {
				Authorization: `Bearer ${cookie["access_token"]}`,
			},
			params: {
				market: useMarket ? "from_token" : undefined,
			},
		});

		return resp.data;
	} catch (error) {
		if (error.isAxiosError)
			console.error(
				`${error.request.protocol}//${error.request.host}${error.request.path}`,
				error.response.data
			);

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
	STATE === "offline"
		? require("../../samples/albums.json")
		: makeSpotifyRequest(`/me/albums?offset=${offset}`, cookie);

export const getPlaylists = async (cookie, offset = 0) =>
	STATE === "offline"
		? require("../../samples/playlists.json")
		: makeSpotifyRequest(`/me/playlists?offset=${offset}`, cookie);

export const getArtistStatistics = async (
	cookie,
	{ offset = 0, range = "medium_term" }
) =>
	STATE === "offline"
		? require("../../samples/top-artists.json")
		: makeSpotifyRequest(
				`/me/top/artists?time_range=${range}&offset=${offset}&limit=25`,
				cookie,
				false
		  );

export const getTrackStatistics = async (
	cookie,
	{ offset = 0, range = "medium_term" }
) =>
	STATE === "offline"
		? require("../../samples/top-tracks.json")
		: makeSpotifyRequest(
				`/me/top/tracks?time_range=${range}&offset=${offset}&limit=25`,
				cookie,
				false
		  );

export const getAlbum = async (cookie, id) => {
	const [album, tracks] = await Promise.all([
		STATE === "offline"
			? require("../../samples/album.json")
			: makeSpotifyRequest(`/albums/${id}`, cookie),
		STATE === "offline"
			? require("../../samples/album-tracks.json")
			: makeSpotifyRequest(`/albums/${id}/tracks`, cookie),
	]);

	album.tracks = { ...album.tracks, ...tracks };

	return album;
};

export const getArtist = async (cookie, id) => {
	const [artist, albums, related, tracks] = await Promise.all([
		STATE === "offline"
			? require("../../samples/artist.json")
			: makeSpotifyRequest(`/artists/${id}`, cookie),
		STATE === "offline"
			? require("../../samples/artist-albums.json")
			: makeSpotifyRequest(`/artists/${id}/albums`, cookie),
		STATE === "offline"
			? require("../../samples/artist-related-artists.json")
			: makeSpotifyRequest(`/artists/${id}/related-artists`, cookie),
		STATE === "offline"
			? require("../../samples/artist-top-tracks.json")
			: makeSpotifyRequest(`/artists/${id}/top-tracks`, cookie),
	]);

	return {
		...artist,
		albums,
		related: related.artists,
		top: tracks,
	};
};

export const getPlaylist = async (cookie, id, offset = 0) => {
	const [playlist, tracks] = await Promise.all([
		STATE === "offline"
			? require("../../samples/playlist.json")
			: makeSpotifyRequest(`/playlists/${id}?offset=${offset}`, cookie),
		STATE === "offline"
			? require("../../samples/playlist-tracks.json")
			: makeSpotifyRequest(
					`/playlists/${id}/tracks?offset=${offset}`,
					cookie
			  ),
	]);

	return {
		...playlist,
		tracks,
	};
};
