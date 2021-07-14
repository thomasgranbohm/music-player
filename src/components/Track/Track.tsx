import Image, { ImagesArray } from "components/Image/Image";
import LinkListing from "components/LinkListing/LinkListing";
import { concat, parseDate } from "lib/functions";
import classes from "./Track.module.scss";

type Props = {
	artists;
	album;
	duration_ms: number;
	explicit: boolean;
	id: string;
	name: string;
	track_number: number;
};

const Track = ({
	album,
	artists,
	duration_ms,
	explicit,
	id,
	name,
	track_number,
}: Props) => {
	return (
		<div
			className={concat(classes["container"], [
				classes["with-image"],
				!!album?.images,
			])}
		>
			<p className={classes["number"]}>{track_number}</p>
			{!!album && !!album.images && (
				<Image images={album.images} size="small" name={name} />
			)}
			<div className={classes["name"]}>
				<p>
					<b>{name}</b>
				</p>
				<LinkListing
					links={artists.map(({ id, name }) => ({
						key: id,
						link: `/artist/${id}`,
						title: name,
					}))}
				/>
			</div>
			<p className={classes["explicit"]}>
				<b>{explicit ? "E" : ""}</b>
			</p>
			<p className={classes["duration"]}>{parseDate(duration_ms)}</p>
		</div>
	);
};

export default Track;
