import Link from "next/link";
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
} & HTMLAttributes<HTMLElement>;

const Cover = ({ artists, images, name, className }: CoverProps) => (
	<div className={[classes["header"], className].join(" ")}>
		<Image className={classes["cover"]} images={images} name={name} />
		<div className={classes["text"]}>
			<h1 className={classes["title"]}>{name}</h1>
			<LinkListing
				className={classes["artists"]}
				links={artists.map(({ id: artistsId, name, href }) => ({
					key: artistsId,
					link: href,
					title: name,
				}))}
			/>
			{/* <h2 >
				{artists.map(({ id: artistId, name }) => (
					<Link href={`/artist/${artistId}`}>{name}</Link>
				))}
			</h2> */}
		</div>
	</div>
);

export default Cover;
