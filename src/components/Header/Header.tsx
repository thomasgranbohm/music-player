import Link from "components/Link/Link";
import classes from "./Header.module.scss";

const Header = ({ className }) => (
	<header className={[classes["header"], className].join(" ")}>
		<div className={classes["logo"]}>
			<a href="/">
				<img src="/images/spotify-logo-White.png" alt="" />
			</a>
		</div>
		<div className={classes["links"]}>
			<Link href="/albums">Albums</Link>
			<Link href="/playlists">Playlists</Link>
			<Link href="/statistics">Statistics</Link>
		</div>
	</header>
);

export default Header;
