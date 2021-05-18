import withSession from "../../../lib/session";
import { makeSpotifyRequest } from "../../../lib/spotify";

const Playlist = withSession(async (req, res) => {
	const cookie = await req.session.get("user-data");

	const data = await makeSpotifyRequest("/me/playlists", cookie);

	return res.json({ ...data });
});

export default Playlist;
