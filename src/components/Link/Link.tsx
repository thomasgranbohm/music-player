import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { HTMLAttributes } from "react";
import { FC } from "react";
import classes from "./Link.module.scss";

type LinkProps = {
	className?: string;
} & NextLinkProps &
	HTMLAttributes<HTMLElement>;

const Link: FC<LinkProps> = ({ className, href, children, ...props }) => (
	<NextLink href={href}>
		<a {...props} className={[className, classes["link"]].join(" ")}>
			{children}
		</a>
	</NextLink>
);

export default Link;
