import TrackListing from "components/TrackListing/TrackListing";
import { getAlbum } from "lib/spotify";
import { getSSP } from "lib/ssr";
import { GetServerSideProps } from "next";
import classes from "styles/Album.module.scss";
import Cover from "../../components/Cover/Cover";


export const getServerSideProps: GetServerSideProps = getSSP(
	async ({ cookie, query }) => {
		const { id } = query;

		const album = await getAlbum(cookie, id);

		return { props: { album } };
	}
);

const Album = ({ album }) => {
	const { artists, genres, id, images, name, tracks, type } = album;
	return (
		<div className={classes["container"]}>
			<Cover
				className={classes["header"]}
				images={images}
				name={name}
				artists={artists}
			/>
			<TrackListing tracks={tracks}/>
			<pre>
				<code>
					{JSON.stringify(
						{ artists, genres, id, images, name, type },
						null,
						4
					)}
				</code>
			</pre>
		</div>
	);
};

export default Album;
