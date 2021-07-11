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
	const { artists, copyrights, genres, images, label, name, release_date, tracks, type } = album;
	return (
		<div className={classes["container"]}>
			<Cover
				className={classes["header"]}
				images={images}
				name={name}
				artists={artists}
				release_date={release_date}
				tracks_amount={tracks.items.length}
				type={type}
			/>
			<TrackListing tracks={tracks} />
			<div className={classes["additional-information"]}>
				{genres && <p className={classes["genres"]}>{genres.join(", ")}</p>}
				<p className={classes["label"]}><b>Label:</b> {label}</p>
				<p className={classes["release-date"]}><b>Released at:</b> {release_date}</p>
				<div className={classes["copyrights"]}>
					{copyrights.map(({ text, type }) => <p key={type + text}>{type === "C" ? "©" : "®"} {text}</p>)}
				</div>
			</div>
		</div>
	);
};

export default Album;
