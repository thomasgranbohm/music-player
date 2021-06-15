import axios from "axios";

export const nextInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BASE_URL + "/api",
});

export const spotifyInstance = axios.create({
	baseURL: "https://api.spotify.com/v1",
	// params: {
	// 	limit: 50,
	// },
});
