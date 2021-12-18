import Heading from "components/Heading/Heading";
import PageTitle from "components/PageTitle/PageTitle";
import Image from "next/image";
import classes from "styles/Login.module.scss";

const Login = () => {
	const SCOPES =
		"user-read-private user-read-email user-library-read streaming user-top-read playlist-read-private playlist-read-collaborative";
	return (
		<div className={classes["container"]}>
			<PageTitle title="Login" />
			<a
				href={`https://accounts.spotify.com/authorize?response_type=code&client_id=${
					process.env.NEXT_PUBLIC_CLIENT_ID
				}&scope=${encodeURIComponent(SCOPES)}&redirect_uri=${
					process.env.NEXT_PUBLIC_BASE_URL
				}${encodeURIComponent(
					process.env.NEXT_PUBLIC_AUTHORIZATION_REDIRECT_URI
				)}`}
				className={classes["button"]}
			>
				<div className={classes["icon"]}>
					<Image
						alt="Spotify Icon"
						height={709}
						priority={true}
						src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/Spotify_Icon_RGB_White.png`}
						width={709}
					/>
				</div>

				<Heading type="h2" className={classes["title"]}>
					Login with Spotify
				</Heading>
			</a>
		</div>
	);
};

export default Login;
