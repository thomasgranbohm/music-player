import { ReactNode } from "react";
import Image from "components/Image/Image";
import Link from "components/Link/Link";
import LinkListing from "components/LinkListing/LinkListing";
import classes from "./Blurb.module.scss";
import { Owner } from "types";

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
	owner: Owner;
} & BasicProps;

export const PlaylistBlurb = ({ id, owner, ...props }: PlaylistBlurbProps) => (
	<Blurb
		{...props}
		id={id}
		href={`/playlist/${id}`}
		subtitle={
			<Link href={owner.external_urls["spotify"]}>
				{owner.display_name}
			</Link>
		}
		type="playlist"
	/>
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
				links={artists.map(({ id, name }) => ({
					key: id,
					link: `/artist/${id}`,
					title: name,
				}))}
			/>
		}
		href={`/album/${props.id}`}
		type="album"
	/>
);

export const ArtistBlurb = (props) => (
	<Blurb {...props} href={`/artist/${props.id}`} />
);

type BlurbProps = {
	subtitle: string | ReactNode;
	type: "playlist" | "album";
	explicit?: boolean;
} & BasicProps;

const Blurb = ({
	images,
	name,
	subtitle,
	type,
	href,
	explicit,
	...rest
}: BlurbProps) => {
	return (
		<div className={[classes["blurb"], classes[type]].join(" ")}>
			<Link href={href}>
				<Image
					size="medium"
					className={classes["cover"]}
					images={images}
					name={`${name} cover`}
					look="rounded"
				/>
			</Link>
			<Link href={href}>
				<p className={classes["title"]} title={name}>
					<b>{name}</b> {explicit && "E"}
				</p>
			</Link>
			<div className={classes["sub-title"]}>{subtitle}</div>
		</div>
	);
};
