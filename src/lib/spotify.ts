import { spotifyInstance } from "./api";

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

export const getAlbums = async (cookie, offset = 0) => {
	const data = await makeSpotifyRequest(
		`/me/albums?offset=${offset}`,
		cookie
	);
	return data;
};

export const getPlaylists = async (cookie, offset = 0) => {
	const data = await makeSpotifyRequest(
		`/me/playlists?offset=${offset}`,
		cookie
	);
	return data;
};

export const getAlbum = async (cookie, id) => {
	const [album, tracks] = await Promise.all([
		makeSpotifyRequest(`/albums/${id}`, cookie),
		makeSpotifyRequest(`/albums/${id}/tracks`, cookie),
	]);

  album.tracks = tracks;

  return album;
};
