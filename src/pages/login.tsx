import classes from "../styles/Login.module.scss";

const Login = () => {
	const SCOPES =
		"user-read-private user-read-email user-library-read streaming user-top-read playlist-read-private playlist-read-collaborative";
	return (
		<div className={classes["container"]}>
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
				<img
					className={classes["icon"]}
					src="/images/Spotify_Icon_RGB_White.png"
					alt="Spotify Icon"
				/>
				<h2 className={classes["title"]}>Login with Spotify</h2>
			</a>
		</div>
	);
};

export default Login;
