import axios from "axios";

export const makeSpotifyRequest = async (url, cookie) => {
	try {
		const resp = await axios.get(url, {
			headers: {
				Authorization: `Bearer ${cookie["access_token"]}`,
			},
		});

		console.log(resp);

		return resp.data;
	} catch (error) {
		// console.log(error.response.data);
		if (
			error.isAxiosError &&
			error.response.data.error.message === "The access token expired"
		) {
			await axios.get("http://localhost:3000/api/spotify/refresh");
			return makeSpotifyRequest(url, cookie);
		}

		return { error: true };
	}
};
