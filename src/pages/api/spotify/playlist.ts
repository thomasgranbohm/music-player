import axios from "axios";
import withSession from "../../../lib/session";
import { makeSpotifyRequest } from "../../../lib/spotify";

const Playlist = withSession(async (req, res) => {
	const cookie = req.session.get("cookie");

	console.log(cookie);

	const data = await makeSpotifyRequest(
		"https://api.spotify.com/v1/me/playlists",
		cookie
	);

	return res.json({ ...data });
});

export default Playlist;
