import concat from "lib/concat";
import React, { FC, HTMLAttributes } from "react";
import classes from "./Heading.module.scss";

type Props = HTMLAttributes<HTMLHeadingElement> & {
	type: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
	look?: "biggest" | "smallest";
};

const Heading: FC<Props> = ({
	look: style,
	type,
	children,
	className,
	...rest
}) => {
	const Element = React.createElement(type, {
		...rest,
		className: concat(
			classes["heading"],
			[classes[style], !!style],
			[className, !!className]
		),
		children,
	});
	return Element;
};

export default Heading;
