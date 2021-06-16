import classes from "./Blurb.module.scss";
import Image from "../Image/Image";
import Link from "../Link/Link";

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
		subtitle={artists[0].name}
		href={`/album/${props.id}`}
		type="album"
	/>
);

type BlurbProps = {
	subtitle: string;
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
			<Link href={"#"}>
				<p className={classes["sub-title"]} title={subtitle}>
					{subtitle}
				</p>
			</Link>
		</div>
	);
};
