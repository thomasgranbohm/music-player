import LinkListing from "components/LinkListing/LinkListing";
import concat from "lib/concat";
import classes from "./Track.module.scss";

type Props = {
    artists,
    duration_ms: number,
    explicit: boolean,
    id: string,
    name: string,
    track_number: number,
}

const Track = ({ artists, duration_ms, explicit, id, name, track_number, ...rest }: Props) => {
    console.log(rest);

    const date = new Date(duration_ms);
    const getDate = () => `${date.getMinutes()}:${date.getSeconds().toString().padStart(2, "0")}`.padStart(4, "0");


    return <div className={classes["container"]}>
        <p className={classes["number"]}>{track_number}</p>
        <p className={classes["name"]}><b>{name}</b> – <LinkListing
            links={artists.map(({ id, href, name }) => ({
                key: id,
                link: href,
                title: name,
            }))}
        /></p>
        <p className={classes["explicit"]}><b>{explicit ? "E" : ""}</b></p>
        <p className={classes["duration"]}>{getDate()}</p>

    </div>
}

export default Track;