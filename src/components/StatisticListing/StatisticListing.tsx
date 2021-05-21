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
			<h2>{title}</h2>
			<ul className="items">
				{items.map(({ images, name, album, artists }, i) => {
					const statisticProps = {
						clicked: clickedIndex === i,
						key: name,
						onClick: () => setClickedIndex(clickedIndex !== i ? i : undefined),
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
