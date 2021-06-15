import { AnchorHTMLAttributes, FC } from "react";
import Link, { LinkProps } from "next/link";
import classes from "./Link.module.scss";

type CustomLinkProps = {
	className?: string;
} & LinkProps;

const CustomLink: FC<CustomLinkProps> = ({ className, href, children, ...props }) => (
	<Link href={href} {...props}>
		<a className={[className, classes["link"]].join(" ")}>{children}</a>
	</Link>
);

export default CustomLink;
