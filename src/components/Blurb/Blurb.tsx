import classes from "./Blurb.module.scss";

type BasicProps = {
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
	<Blurb {...props} subtitle={artists[0].name} type="album" />
);

type BlurbProps = {
	subtitle: string;
	type: "playlist" | "album";
} & BasicProps;

const Blurb = ({ images, name, subtitle, type, href }: BlurbProps) => {
	return (
		<div className={[classes["blurb"], classes[type]].join(" ")}>
			<img className={classes["cover"]} src={images?.[0]?.url} alt="" />
			<p className={classes["title"]} title={name}>
				<b>{name}</b>
			</p>
			<p className={classes["sub-title"]} title={subtitle}>
				{subtitle}
			</p>
		</div>
	);
};
