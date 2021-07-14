import { AlbumBlurb, ArtistBlurb } from "components/Blurb/Blurb";
import BlurbListing from "components/BlurbListing/BlurbListing";
import Cover from "components/Cover/Cover";
import PageTitle from "components/PageTitle/PageTitle";
import TrackListing from "components/TrackListing/TrackListing";
import { getArtist } from "lib/spotify";
import { getSSP } from "lib/ssr";

export const getServerSideProps = getSSP(async ({ cookie, query }) => {
	const { id } = query;

	const artist = await getArtist(cookie, id);

	return {
		props: { artist },
	};
});

const Artist = ({
	artist: {
		name,
		albums: { items },
		followers,
		genres,
		images,
		top,
		related,
		...rest
	},
}) => {
	const albums = items.filter(
		({ album_group, name }, i, arr) =>
			album_group === "album" &&
			arr.findIndex((a) => a.name === name) === i
	);
	const singles = items.filter(
		({ album_group, name }, i, arr) =>
			album_group === "single" &&
			arr.findIndex((a) => a.name === name) === i
	);

	return (
		<div>
			<PageTitle title={name} />
			<Cover
				type="artist"
				followers={followers.total}
				genres={genres}
				images={images}
				name={name}
			/>
			<TrackListing type="artist" tracks={top} />
			{albums.length > 0 && (
				<BlurbListing title="albums" scroll>
					{albums.map((album) => (
						<AlbumBlurb {...album} key={album.id} />
					))}
				</BlurbListing>
			)}
			{singles.length > 0 && (
				<BlurbListing title="singles" scroll>
					{singles.map((album) => (
						<AlbumBlurb {...album} key={album.id} />
					))}
				</BlurbListing>
			)}
			<BlurbListing title="related artist" scroll>
				{related.map((artist) => (
					<ArtistBlurb {...artist} />
				))}
			</BlurbListing>
		</div>
	);
};

export default Artist;
