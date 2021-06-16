import axios from "axios";
import qs from "querystring";
import withSession from "lib/session";

const Authorization = withSession(async (req, res) => {
	const { code, error, state } = req.query;
	if (error) {
		return res.redirect("/login?error=true");
	}

	const resp = await axios({
		method: "POST",
		url: "https://accounts.spotify.com/api/token",
		data: qs.stringify({
			code,
			grant_type: "authorization_code",
			redirect_uri:
				process.env.BASE_URL +
				process.env.NEXT_PUBLIC_AUTHORIZATION_REDIRECT_URI,
		}),
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			Authorization: `Basic ${Buffer.from(
				`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`
			).toString("base64")}`,
		},
	});

	req.session.set("user-data", { ...resp.data });
	await req.session.save();

	return res.redirect("/");
});

export default Authorization;
