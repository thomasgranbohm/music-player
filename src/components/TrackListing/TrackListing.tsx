import Track from "components/Track/Track";
import { useState } from "react";
import classes from "./TrackListing.module.scss";

const TrackListing = ({ tracks: { items } }) => {
    const [tracks, setTracks] = useState(items);

    return <div className={classes["container"]}>
        {tracks.map((props, i) => <Track {...props} key={i} />)}
    </div>
}

export default TrackListing;