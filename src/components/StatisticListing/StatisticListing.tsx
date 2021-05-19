import { FC } from "react";
import classes from "./StatisticListing.module.scss";

type StatisticListingProps = {
	title: string;
};

const StatisticListing: FC<StatisticListingProps> = ({ children, title }) => (
	<div className={classes["container"]}>
		<h2>{title}</h2>
		<div className="items">{children}</div>
	</div>
);

export default StatisticListing;
