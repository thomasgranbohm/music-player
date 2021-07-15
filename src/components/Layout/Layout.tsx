import { FC } from "react";
import Header from "components/Header/Header";
import Link from "components/Link/Link";
import classes from "./Layout.module.scss";

const Layout: FC = ({ children }) => {
	return (
		<main className={classes["layout"]}>
			<Header className={classes["header"]} />
			<article className={classes["children"]}>{children}</article>
			<footer className={classes["footer"]}>
				<Link href="https://github.com/thomasgranbohm/music-player">
					Source code
				</Link>
				{new Date().getFullYear()}
			</footer>
		</main>
	);
};

export default Layout;
