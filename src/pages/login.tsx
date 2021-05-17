const Login = () => {
	const SCOPES =
		"user-read-private user-read-email user-library-read streaming user-top-read playlist-read-private playlist-read-collaborative";
	return (
		<>
			<h1>Login</h1>
			<a
				href={`https://accounts.spotify.com/authorize?response_type=code&client_id=${
					process.env.NEXT_PUBLIC_CLIENT_ID
				}&scope=${encodeURIComponent(
					SCOPES
				)}&redirect_uri=http://localhost:3000${encodeURIComponent(
					process.env.NEXT_PUBLIC_AUTHORIZATION_REDIRECT_URI
				)}`}
			>
				Spotify
			</a>
		</>
	);
};

export default Login;
