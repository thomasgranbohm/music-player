import { HTMLAttributes } from "react";
import { ReactNode } from "react";
import Link from "../Link/Link";
import classes from "./LinkListing.module.scss";

type LinkListingProps = {
	links: Array<{ title: string; link: string; key: string }>;
	surroundingElement?: ReactNode;
} & HTMLAttributes<HTMLElement>;

const LinkListing = ({
	links,
	surroundingElement,
	className,
}: LinkListingProps) => (
	<ul className={[classes["list"], className ? className : ""].join(" ")}>
		{links.map(({ key, link, title }, i) => (
			<li key={"LinkListing" + i + key} className={classes["item"]}>
				<Link href={link}>{title}</Link>
			</li>
		))}
	</ul>
);

export default LinkListing;
