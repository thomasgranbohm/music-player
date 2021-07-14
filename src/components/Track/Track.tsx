import LinkListing from "components/LinkListing/LinkListing";
import classes from "./Track.module.scss";

type Props = {
	artists;
	duration_ms: number;
	explicit: boolean;
	id: string;
	name: string;
	track_number: number;
};

const Track = ({
	artists,
	duration_ms,
	explicit,
	id,
	name,
	track_number,
}: Props) => {
	const date = new Date(duration_ms);
	const getDate = () =>
		`${date.getMinutes()}:${date
			.getSeconds()
			.toString()
			.padStart(2, "0")}`.padStart(4, "0");

	return (
		<div className={classes["container"]}>
			<p className={classes["number"]}>{track_number}</p>
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
			<p className={classes["duration"]}>{getDate()}</p>
		</div>
	);
};

export default Track;
