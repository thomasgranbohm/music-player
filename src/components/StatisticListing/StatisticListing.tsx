import Heading from "components/Heading/Heading";
import { useState } from "react";
import Statistic from "../Statistic/Statistic";
import classes from "./StatisticListing.module.scss";

type StatisticListingProps = {
	title: string;
	type: "track" | "artist";
	items: [];
};

const StatisticListing = ({ items, title, type }: StatisticListingProps) => {
	const [clickedIndex, setClickedIndex] = useState<number>(undefined);

	return (
		<div className={classes["container"]}>
			<Heading type="h2">{title}</Heading>
			<ul className="items">
				{items.map(({ id, images, name, album, artists, href }, i) => {
					const statisticProps = {
						clicked: clickedIndex === i,
						key: id,
						id,
						onClick: () =>
							setClickedIndex(clickedIndex !== i ? i : undefined),
						title: name,
					};

					return type === "artist" ? (
						<Statistic
							{...statisticProps}
							images={images}
							type="artist"
						/>
					) : (
						<Statistic
							{...statisticProps}
							album={album}
							artists={artists}
							type="track"
						/>
					);
				})}
			</ul>
		</div>
	);
};

export default StatisticListing;
