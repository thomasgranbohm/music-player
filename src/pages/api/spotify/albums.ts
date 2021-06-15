import withSession from "../../../lib/session";
import { getAlbums } from "../../../lib/spotify";

const Album = withSession(async (req, res) => {
	console.log(req.query);
	const cookie = await req.session.get("user-data");

	const data = await getAlbums(cookie, req.query.offset);

	return res.json({ ...data });
});

export default Album;
