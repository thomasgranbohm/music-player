import Heading from "components/Heading/Heading";
import StatisticListing from "components/StatisticListing/StatisticListing";
import { nextInstance } from "lib/api";
import useObserver from "lib/observer";
import { getArtistStatistics, getTrackStatistics } from "lib/spotify";
import { getSSP } from "lib/ssr";
import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import { useState } from "react";
import classes from "styles/Statistics.module.scss";

const ALLOWED_RANGES = ["short_term", "medium_term", "long_term"];

export const getServerSideProps: GetServerSideProps = getSSP(
	async ({ query, cookie }) => {
		const range = (query.range as string) || "medium_term";

		const usedRange = ALLOWED_RANGES.includes(range)
			? range
			: "medium_term";

		const [artists, tracks] = await Promise.all([
			getArtistStatistics(cookie, { range }),
			getTrackStatistics(cookie, { range }),
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

const Statistics = ({ artists: baseArtists, tracks: baseTracks, range }) => {
	const [artists, setArtists] = useState(baseArtists.items);
	const [tracks, setTracks] = useState(baseTracks.items);

	const sentinel = useObserver(
		async () => {
			const { data } = await nextInstance(`/spotify/statistics`, {
				params: {
					range,
					artists_offset: artists.length,
					tracks_offset: tracks.length,
				},
			});

			const { artists: newArtists, tracks: newTracks } = data;

			setArtists([...artists, ...newArtists.items]);
			setTracks([...tracks, ...newTracks.items]);
		},
		{
			condition:
				artists.length >= baseArtists.total &&
				tracks.length >= baseTracks.total,
		}
	);

	return (
		<>
			<NextSeo title="Statistics" />
			<Heading type="h1">Statistics</Heading>
			<div className={classes["listings"]}>
				<StatisticListing
					title="Artists"
					items={artists}
					type="artist"
				/>
				<StatisticListing title="Tracks" items={tracks} type="track" />
			</div>
			{sentinel}
		</>
	);
};

export default Statistics;
