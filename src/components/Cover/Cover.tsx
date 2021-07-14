import Heading from "components/Heading/Heading";
import { concat, parseDate, readableNumber } from "lib/functions";
import { HTMLAttributes } from "react";
import { Followers } from "types";
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
	playtime: number;
	tracks_amount: number;
	type: "album";
};

type ArtistProps = {
	followers: Followers;
	genres: String[];
	type: "artist";
};

type PlaylistProps = {
	description?: string;
	followers: Followers;
	playtime: number;
	tracks_amount: number;
	type: "playlist";
};

type CoverProps = {
	images: ImagesArray;
	name: string;
} & HTMLAttributes<HTMLElement> &
	(AlbumProps | ArtistProps | PlaylistProps);

const Cover = ({ images, name, className, type, ...props }: CoverProps) => {
	if (type === "album") {
		const { albumType, artists, release_date, tracks_amount, playtime } =
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
					size="large"
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
						/>
						<span>{new Date(release_date).getFullYear()}</span>
						<span>
							{tracks_amount}{" "}
							{tracks_amount === 1 ? "song" : "songs"}
						</span>
						<span>{parseDate(playtime, true)}</span>
					</div>
				</div>
			</div>
		);
	}
	if (type === "playlist") {
		const { description, followers, playtime, tracks_amount } =
			props as PlaylistProps;
		return (
			<div
				className={concat(classes["header"], classes["playlist"], [
					className,
					!!className,
				])}
			>
				<Image
					className={classes["cover"]}
					images={images}
					name={name}
					size="large"
				/>
				<div className={classes["text"]}>
					<Heading type="h1" look="biggest">
						{name}
					</Heading>
					{description && <Heading type="h2">{description}</Heading>}
					<div className={classes["information"]}>
						<span>{readableNumber(followers.total)} followers</span>
						<span>{tracks_amount} songs</span>
						<span>{parseDate(playtime, true)}</span>
					</div>
				</div>
			</div>
		);
	}
	const { followers } = props as ArtistProps;
	return (
		<div
			className={concat(classes["header"], classes["artist"], [
				className,
				!!className,
			])}
		>
			<Image
				className={classes["cover"]}
				images={images}
				name={name}
				size="large"
			/>
			<div className={classes["text"]}>
				<Heading type="h1" look="biggest">
					{name}
				</Heading>
				<Heading type="h2">
					{readableNumber(followers.total)} followers
				</Heading>
				{/* <Heading type="h3">Genres: {genres.join(", ")}</Heading> */}
			</div>
		</div>
	);
};

export default Cover;
