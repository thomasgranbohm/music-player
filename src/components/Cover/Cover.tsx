import { HTMLAttributes } from "react";
import Image, { ImagesArray } from "../Image/Image";
import LinkListing from "../LinkListing/LinkListing";
import classes from "./Cover.module.scss";

type ArtistProps = {
	external_urls: {
		spotify: string;
	};
	href: string;
	id: string;
	name: string;
	type: string;
	uri: string;
};

type CoverProps = {
	artists: Array<ArtistProps>;
	images: ImagesArray;
	name: string;
	release_date: string;
	tracks_amount: number;
	type: string;
} & HTMLAttributes<HTMLElement>;

const Cover = ({ artists, images, name, className, release_date, tracks_amount, type }: CoverProps) => (
	<div className={[classes["header"], className].join(" ")}>
		<Image className={classes["cover"]} images={images} name={name} />
		<div className={classes["text"]}>
			<h2 className={classes["type"]}>{type}</h2>
			<h1 className={classes["title"]}>{name}</h1>
			<div className={classes["information"]}>
				<LinkListing
					links={artists.map(({ id: artistsId, name, href }) => ({
						key: artistsId,
						link: href,
						title: name,
					}))}
				/> · {new Date(release_date).getFullYear()} · {tracks_amount} {tracks_amount === 1 ? "song" : "songs"}
			</div>
		</div>
	</div>
);

export default Cover;
