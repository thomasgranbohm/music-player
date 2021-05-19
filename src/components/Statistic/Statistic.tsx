import { ImagesArray } from "../Image/Image";
import classes from "./Statistic.module.scss";

type ArtistProps = {
	id: string;
	name: string;
};

type StatisticProps = {
	title: string;
	images: ImagesArray;
} & (
	| {
			type: "track";
			artists: [ArtistProps];
	  }
	| {
			type: "artist";
	  }
);

const Statistic = ({ images, type, title, ...props }: StatisticProps) => (
	<div className={classes["item"]}>
		<p className={classes["title"]}>
			<b>{title}</b>
		</p>
		{type === "track" && (
			<p className={classes["artists"]}>{props["artists"].map((artist) => artist.name).join(" ")}</p>
		)}
	</div>
);

export default Statistic;
