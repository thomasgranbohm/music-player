import Cover from "components/Cover/Cover";
import PageTitle from "components/PageTitle/PageTitle";
import TrackListing from "components/TrackListing/TrackListing";
import { getPlaylist } from "lib/spotify";
import { getSSP } from "lib/ssr";
import { NextSeo } from "next-seo";

export const getServerSideProps = getSSP(async ({ cookie, query }) => {
	const { id } = query;

	const playlist = await getPlaylist(cookie, id);

	return {
		props: {
			playlist,
		},
	};
});

const Playlist = ({
	playlist: { description, followers, name, images, owner, tracks, ...rest },
}) => (
	<div>
		<NextSeo title={name} />
		<Cover
			type="playlist"
			description={description}
			followers={followers}
			name={name}
			images={images}
			owner={owner}
			playtime={tracks.items
				.map(({ track: { duration_ms } }) => new Number(duration_ms))
				.reduce((a, b) => a + b)}
			tracks_amount={tracks.items.length}
		/>
		<TrackListing type="playlist" tracks={tracks} />
	</div>
);
export default Playlist;
