import { ReactNode } from "react";
import Image from "../Image/Image";
import Link from "../Link/Link";
import LinkListing from "../LinkListing/LinkListing";
import classes from "./Blurb.module.scss";

type BasicProps = {
	id: string;
	name: string;
	images?: [
		{
			height: number;
			url: string;
			width: number;
		}
	];
	href: string;
};

type PlaylistBlurbProps = {
	owner: {
		display_name: string;
	};
} & BasicProps;

export const PlaylistBlurb = ({ owner, ...props }: PlaylistBlurbProps) => (
	<Blurb {...props} subtitle={owner.display_name} type="playlist" />
);

type AlbumBlurbProps = {
	artists: [
		{
			id: string;
			href: string;
			name: string;
			external_urls: {
				spotify: string;
			};
		}
	];
} & BasicProps;

export const AlbumBlurb = ({ artists, ...props }: AlbumBlurbProps) => (
	<Blurb
		{...props}
		subtitle={
			<LinkListing
				links={artists.map(({ id, href, name }) => ({
					key: id,
					link: href,
					title: name,
				}))}
			/>
		}
		href={`/album/${props.id}`}
		type="album"
	/>
);

type BlurbProps = {
	subtitle: string | ReactNode;
	type: "playlist" | "album";
} & BasicProps;

const Blurb = ({ images, name, subtitle, type, href }: BlurbProps) => {
	return (
		<div className={[classes["blurb"], classes[type]].join(" ")}>
			<Link href={href}>
				<Image
					className={classes["cover"]}
					images={images}
					name={`${name} cover`}
				/>
			</Link>
			<Link href={href}>
				<p className={classes["title"]} title={name}>
					<b>{name}</b>
				</p>
			</Link>
			<div className={classes["sub-title"]}>{subtitle}</div>
		</div>
	);
};
