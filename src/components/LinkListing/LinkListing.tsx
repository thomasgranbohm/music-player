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
	<p className={[classes["list"], className ? className : ""].join(" ")}>
		{links.map(({ key, link, title }, i) => (
			<Link
				className={classes["item"]}
				key={"LinkListing" + i + key}
				href={link}
				title={title}
			>
				{title}
			</Link>
		))}
	</p>
);

export default LinkListing;
