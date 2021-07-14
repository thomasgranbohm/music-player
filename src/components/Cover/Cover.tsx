import Heading from "components/Heading/Heading";
import concat from "lib/concat";
import { HTMLAttributes } from "react";
import Image, { ImagesArray } from "../Image/Image";
import LinkListing from "../LinkListing/LinkListing";
import classes from "./Cover.module.scss";

type AlbumProps = {
	artists: Array<{
		external_urls: {
			spotify: string;
		};
		href: string;
		id: string;
		name: string;
		type: string;
		uri: string;
	}>;
	albumType: string;
	release_date: string;
	tracks_amount: number;
	type: "album";
};

type ArtistProps = {
	followers: number;
	genres: String[];
	type: "artist";
};

type CoverProps = {
	images: ImagesArray;
	name: string;
} & HTMLAttributes<HTMLElement> &
	(AlbumProps | ArtistProps);

const Cover = ({ images, name, className, type, ...props }: CoverProps) => {
	if (type === "album") {
		const { albumType, artists, release_date, tracks_amount } =
			props as AlbumProps;
		return (
			<div
				className={concat(classes["header"], classes["album"], [
					className,
					!!className,
				])}
			>
				<Image
					className={classes["cover"]}
					images={images}
					name={name}
				/>
				<div className={classes["text"]}>
					<Heading type="h2" look="smallest">
						{albumType}
					</Heading>
					<Heading type="h1" look="biggest">
						{name}
					</Heading>
					<div className={classes["information"]}>
						<LinkListing
							links={artists.map(({ id: artistId, name }) => ({
								key: artistId,
								link: `/artist/${artistId}`,
								title: name,
							}))}
						/>{" "}
						· {new Date(release_date).getFullYear()} ·{" "}
						{tracks_amount} {tracks_amount === 1 ? "song" : "songs"}
					</div>
				</div>
			</div>
		);
	}
	const { followers, genres } = props as ArtistProps;
	return (
		<div
			className={concat(classes["header"], classes["artist"], [
				className,
				!!className,
			])}
		>
			<Image className={classes["cover"]} images={images} name={name} />
			<div className={classes["text"]}>
				<Heading type="h1" look="biggest">
					{name}
				</Heading>
				<Heading type="h2">{followers} followers</Heading>
				{/* <Heading type="h3">Genres: {genres.join(", ")}</Heading> */}
			</div>
		</div>
	);
};

export default Cover;
