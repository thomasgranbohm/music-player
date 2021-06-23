import withSession from "lib/session";
import { getArtistsStatstics, getTracksStatistics } from "lib/spotify";

const Statistic = withSession(async (req, res) => {
	const cookie = await req.session.get("user-data");

	const { artists_offset, range, tracks_offset } = req.query;

	const [artists, tracks] = await Promise.all([
		getArtistsStatstics(cookie, {
			offset: artists_offset,
			range,
		}),
		getTracksStatistics(cookie, {
			offset: tracks_offset,
			range,
		}),
	]);

	return res.json({ artists, tracks });
});

export default Statistic;
