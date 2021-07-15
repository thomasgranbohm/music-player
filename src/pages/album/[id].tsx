import Cover from "components/Cover/Cover";
import PageTitle from "components/PageTitle/PageTitle";
import TrackListing from "components/TrackListing/TrackListing";
import { getAlbum } from "lib/spotify";
import { getSSP } from "lib/ssr";
import { GetServerSideProps } from "next";
import classes from "styles/Album.module.scss";

export const getServerSideProps: GetServerSideProps = getSSP(
	async ({ cookie, query }) => {
		const { id } = query;

		const album = await getAlbum(cookie, id);

		return { props: { album } };
	}
);

const Album = ({
	album: {
		artists,
		copyrights,
		genres,
		images,
		label,
		name,
		release_date,
		tracks,
		type,
	},
}) => (
	<div className={classes["container"]}>
		<PageTitle title={`${name} - ${artists[0].name}`} />
		<Cover
			type="album"
			className={classes["header"]}
			images={images}
			name={name}
			artists={artists}
			release_date={release_date}
			tracks_amount={tracks.items.length}
			playtime={tracks.items
				.map(({ duration_ms }) => duration_ms)
				.reduce((a, b) => a + b)}
			albumType={type}
		/>
		<TrackListing type="album" tracks={tracks} />
		<div className={classes["additional-information"]}>
			{genres && <p className={classes["genres"]}>{genres.join(", ")}</p>}
			{label && (
				<p className={classes["label"]}>
					<b>Label:</b> {label}
				</p>
			)}
			{release_date && (
				<p className={classes["release-date"]}>
					<b>Released at:</b> {release_date}
				</p>
			)}
			{copyrights && copyrights.length > 0 && (
				<div className={classes["copyrights"]}>
					{copyrights.map(({ text, type }) => (
						<p key={type + text}>
							{type === "C" ? "©" : "®"} {text}
						</p>
					))}
				</div>
			)}
		</div>
	</div>
);

export default Album;
