import withSession from "lib/session";
import { getPlaylists } from "lib/spotify";

const Playlist = withSession(async (req, res) => {
	const cookie = await req.session.get("user-data");

	const data = await getPlaylists(cookie, req.query.offset);

	return res.json({ ...data });
});

export default Playlist;
