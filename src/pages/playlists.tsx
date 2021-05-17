import axios from "axios";
import withSession from "../lib/session";
import { makeSpotifyRequest } from "../lib/spotify";

export const getServerSideProps = withSession(async ({ req, res }) => {
	const cookie = await req.session.get("cookie");

	if (!cookie) {
		return {
			redirect: {
				destination: "/login",
			},
		};
	}

	const data = await axios.get("http://localhost:3000/api/spotify/playlist");

	return {
		props: {
			data,
		},
	};
});

const Playlists = (props) => {
	return (
		<div className="playlists">
			<pre>
				<code>{JSON.stringify(props, null, 4)}</code>
			</pre>
		</div>
	);
};

export default Playlists;
