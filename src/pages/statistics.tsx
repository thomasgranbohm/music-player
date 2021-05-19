import { GetServerSideProps } from "next";
import Statistic from "../components/Statistic/Statistic";
import StatisticListing from "../components/StatisticListing/StatisticListing";
import withSession from "../lib/session";
import { makeSpotifyRequest } from "../lib/spotify";

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

		const usedRange = ALLOWED_RANGES.includes(query)
			? query
			: "medium_term";

		const [artists, tracks] = await Promise.all([
			makeSpotifyRequest("/me/top/artists", cookie),
			makeSpotifyRequest("/me/top/tracks", cookie),
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

const Statistics = ({ artists, range, tracks }) => (
	<div>
		<h1>Statistics</h1>
		<StatisticListing title="Artists">
			{artists.items.map(({ images, name }) => (
				<Statistic
					images={images}
					type="artist"
					title={name}
					key={name}
				/>
			))}
		</StatisticListing>
		<StatisticListing title="Tracks">
			{tracks.items.map(({ images, name, artists }) => (
				<Statistic
					images={images}
					type="track"
					title={name}
					artists={artists}
					key={name}
				/>
			))}
		</StatisticListing>
	</div>
);

export default Statistics;
