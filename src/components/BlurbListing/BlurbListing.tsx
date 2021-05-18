import { FC } from "react";
import classes from "./BlurbListing.module.scss";

type BlurbListingType = {
	title: string;
	wrap?: boolean;
};

const BlurbListing: FC<BlurbListingType> = ({ title, children, wrap }) => (
	<div className={classes["listing"]}>
		<h1 className={classes["title"]}>{title}</h1>
		<div className={classes["items"]}>{children}</div>
	</div>
);

export default BlurbListing;
