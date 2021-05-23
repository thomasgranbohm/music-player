import { FC } from "react";
import Link from "next/link";
import classes from "./Link.module.scss";

type LinkProps = {
	href: string;
	className?: string;
};

const CustomLink: FC<LinkProps> = ({ className, href, children }) => (
	<Link href={href}>
		<a className={[className, classes["link"]].join(" ")}>{children}</a>
	</Link>
);

export default CustomLink;
