import { GetServerSideProps } from "next";
import StatisticListing from "components/StatisticListing/StatisticListing";
import withSession from "lib/session";
import { makeSpotifyRequest } from "lib/spotify";
import classes from "styles/Statistics.module.scss";

const ALLOWED_RANGES = ["short_term", "medium_term", "long_term"];

export const getServerSideProps: GetServerSideProps = withSession(
	async ({ req, query }) => {
		const cookie = await req.session.get("user-data");

		if (!cookie) {
			return {
				redirect: {
					destination: "/login",
				},
			};
		}

		const { range } = query;

		const usedRange = ALLOWED_RANGES.includes(range)
			? range
			: "medium_term";

		const [artists, tracks] = await Promise.all([
			makeSpotifyRequest(
				`/me/top/artists?time_range=${usedRange}`,
				cookie
			),
			makeSpotifyRequest(
				`/me/top/tracks?time_range=${usedRange}`,
				cookie
			),
		]);

		return {
			props: {
				range: usedRange,
				artists,
				tracks,
			},
		};
	}
);

const Statistics = ({ artists, tracks }) => (
	<>
		<h1>Statistics</h1>
		<div className={classes["listings"]}>
			<StatisticListing
				title="Artists"
				items={artists.items}
				type="artist"
			/>
			<StatisticListing
				title="Tracks"
				items={tracks.items}
				type="track"
			/>
		</div>
	</>
);

export default Statistics;
