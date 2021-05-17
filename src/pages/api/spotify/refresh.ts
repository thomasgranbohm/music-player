import axios from "axios";
import withSession from "../../../lib/session";
import { makeSpotifyRequest } from "../../../lib/spotify";
import qs from "querystring";

const RefreshToken = withSession(async (req, res) => {
	const cookie = req.session.get("cookie");

	console.log(cookie, req.session);

	try {
		const resp = await axios({
			method: "POST",
			url: "https://accounts.spotify.com/api/token",
			data: qs.stringify({
				grant_type: "refresh_token",
				refresh_token: cookie["refresh_token"],
			}),
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				Authorization: `Basic ${Buffer.from(
					`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`
				).toString("base64")}`,
			},
		});

		console.log("New access token:", resp.data["access_token"]);

		req.session.set("cookie", {
			...cookie,
			access_token: resp.data["access_token"],
		});
	} catch (error) {
		console.log(error, "error");
	}
});

export default RefreshToken;
