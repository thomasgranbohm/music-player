import Track from "components/Track/Track";
import { useState } from "react";
import classes from "./TrackListing.module.scss";

type Props = {
	tracks: Array<any>;
	type: "artist" | "album";
};

const TrackListing = ({ tracks: items, type }: Props) => {
	const [tracks, setTracks] = useState(items);

	return (
		<div className={classes["container"]}>
			{tracks.map((props, i) => (
				<Track
					{...props}
					track_number={
						type === "artist" ? i + 1 : props.track_number
					}
					key={i}
				/>
			))}
		</div>
	);
};

export default TrackListing;
