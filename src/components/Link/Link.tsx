import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { FC } from "react";
import classes from "./Link.module.scss";

type LinkProps = {
	className?: string;
} & NextLinkProps;

const Link: FC<LinkProps> = ({ className, href, children, ...props }) => (
	<NextLink href={href} {...props}>
		<a className={[className, classes["link"]].join(" ")}>{children}</a>
	</NextLink>
);

export default Link;
