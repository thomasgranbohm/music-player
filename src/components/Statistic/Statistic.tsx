import { MouseEventHandler } from "react";
import Image, { ImagesArray } from "components/Image/Image";
import Link from "components/Link/Link";
import LinkListing from "components/LinkListing/LinkListing";
import classes from "./Statistic.module.scss";

type ArtistProps = {
	href: string;
	id: string;
	name: string;
};

export type StatisticProps = {
	clicked?: boolean;
	onClick: MouseEventHandler<HTMLDivElement>;
	title: string;
} & (
	| {
			album: {
				images: ImagesArray;
			};
			artists: [ArtistProps];
			type: "track";
	  }
	| {
			images: ImagesArray;
			type: "artist";
			id: string;
	  }
);

const Statistic = ({
	clicked,
	onClick,
	title,
	type,
	...props
}: StatisticProps) => {
	return (
		<div
			className={[
				classes["item"],
				classes[type],
				clicked && classes["clicked"],
			].join(" ")}
			onClick={onClick}
		>
			<Image
				className={classes["cover"]}
				images={
					type === "artist"
						? props["images"]
						: props["album"]["images"]
				}
				name={title}
				size="medium"
			/>
			<li className={classes["info"]}>
				{type === "artist" ? (
					<Link href={`/artist/${props["id"]}`}>
						<p className={classes["title"]}>
							<b>{title}</b>
						</p>
					</Link>
				) : (
					<p className={classes["title"]}>
						<b>{title}</b>
					</p>
				)}
				{type === "track" && (
					<LinkListing
						className={classes["artists"]}
						links={props["artists"].map(({ id, href, name }) => ({
							key: id,
							link: `/artist/${id}`,
							title: name,
						}))}
					/>
				)}
			</li>
		</div>
	);
};

export default Statistic;
