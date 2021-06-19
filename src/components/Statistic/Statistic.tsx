import { MouseEventHandler } from "react";
import Image, { ImagesArray } from "../Image/Image";
import LinkListing from "../LinkListing/LinkListing";
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
				<p className={classes["title"]}>
					<b>{title}</b>
				</p>
				{type === "track" && (
					<LinkListing
						className={classes["artists"]}
						links={props["artists"].map(({ id, href, name }) => ({
							key: id,
							link: href,
							title: name,
						}))}
					/>
					// <p className={classes["artists"]}>
					// 	{props["artists"]
					// 		.map((artist) => artist.name)
					// 		.join(", ")}
					// </p>
				)}
			</li>
		</div>
	);
};

export default Statistic;
