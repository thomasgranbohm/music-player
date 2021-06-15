import { FC } from "react";
import classes from "./BlurbListing.module.scss";

type BlurbListingType = {
	title: string;
	wrap?: boolean;
};

const BlurbListing: FC<BlurbListingType> = ({ title, children, wrap }) => (
	<div className={[classes["listing"], wrap && classes["wrap"]].join(" ")}>
		<h1 className={classes["title"]}>{title}</h1>
		<div className={classes["items"]}>
			<div className={classes["children"]}>{children}</div>
		</div>
	</div>
);

export default BlurbListing;
