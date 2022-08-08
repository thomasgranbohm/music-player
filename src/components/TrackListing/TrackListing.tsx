import Track from "components/Track/Track";
import { useCallback, useEffect, useState } from "react";
import { PagingObject } from "types";
import { concat } from "../../lib/functions";
import classes from "./TrackListing.module.scss";

type Props = {
	tracks: PagingObject<any>;
	type: "artist" | "album" | "playlist";
	dropdown?: boolean;
	title?: string;
};

const TrackListing = ({ dropdown, title, tracks: items, type }: Props) => {
	const [tracks, setTracks] = useState(items);
	const [open, setOpen] = useState(!dropdown);

	const renderItem = (props, i) => {
		if (type === "artist") {
			return <Track {...props} track_number={i + 1} key={i} />;
		} else if (type === "playlist") {
			return <Track {...props.track} track_number={i + 1} key={i} />;
		} else {
			return <Track {...props} key={i} />;
		}
	};

	const handleClick = useCallback(() => {
		setOpen(!open);
	}, [open]);

	useEffect(() => {
		setTracks(items);
	}, [tracks.items, items]);

	return !dropdown ? (
		<ol className={classes["container"]}>{tracks.items.map(renderItem)}</ol>
	) : (
		<ol className={concat(classes["container"])}>
			{title && <b>{title}</b>}
			{!dropdown ? (
				tracks.items.map(renderItem)
			) : (
				<>
					{tracks.items
						.slice(0, open ? tracks.items.length : 5)
						.map(renderItem)}
					<button
						className={classes["dropdown-handler"]}
						onClick={handleClick}
					>
						{open ? "Show less" : "Show more"}
					</button>
				</>
			)}
		</ol>
	);
};

export default TrackListing;
