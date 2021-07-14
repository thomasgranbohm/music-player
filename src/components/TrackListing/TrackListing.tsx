import Track from "components/Track/Track";
import { useEffect, useState } from "react";
import { PagingObject } from "types";
import classes from "./TrackListing.module.scss";

type Props = {
	tracks: PagingObject<any>;
	type: "artist" | "album" | "playlist";
};

const TrackListing = ({ tracks: items, type }: Props) => {
	const [tracks, setTracks] = useState(items);

	useEffect(() => {
		setTracks(items);
	}, [tracks.items, items]);

	return (
		<div className={classes["container"]}>
			{tracks.items.map((props, i) => {
				if (type === "artist") {
					return <Track {...props} track_number={i + 1} key={i} />;
				} else if (type === "playlist") {
					return (
						<Track {...props.track} track_number={i + 1} key={i} />
					);
				} else {
					return <Track {...props} key={i} />;
				}
			})}
		</div>
	);
};

export default TrackListing;
