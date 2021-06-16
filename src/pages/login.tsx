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
			>
				<h2 className={classes["button"]}>Spotify Login</h2>
			</a>
		</div>
	);
};

export default Login;
