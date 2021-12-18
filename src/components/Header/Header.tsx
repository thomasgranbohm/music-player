import Link from "components/Link/Link";
import Image from "next/image";
import classes from "./Header.module.scss";

const Header = ({ className }) => (
	<header className={[classes["header"], className].join(" ")}>
		<a href="/">
			<div className={classes["logo"]}>
				<Image
					src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/spotify-logo-White.png`}
					alt="Spotify Logo"
					width={2362}
					height={708}
				/>
			</div>
		</a>
		<div className={classes["links"]}>
			<Link href="/albums">Albums</Link>
			<Link href="/playlists">Playlists</Link>
			<Link href="/statistics">Statistics</Link>
		</div>
	</header>
);

export default Header;
