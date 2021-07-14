import Heading from "components/Heading/Heading";
import { FC } from "react";
import classes from "./BlurbListing.module.scss";

type BlurbListingType = {
	title: string;
	scroll?: boolean;
};

const BlurbListing: FC<BlurbListingType> = ({ title, children, scroll }) => (
	<div
		className={[classes["listing"], scroll && classes["scroll"]].join(" ")}
	>
		<Heading type="h1" className={classes["title"]}>
			{title}
		</Heading>
		<div className={classes["items"]}>
			<div className={classes["children"]}>{children}</div>
		</div>
	</div>
);

export default BlurbListing;
