import styles from "../styles/Home.module.css";
import useSWR from "swr";
import withSession from "../lib/session";

import Link from "../components/Link/Link";

export const getServerSideProps = withSession(async ({ req, res }) => {
	const cookie = req.session.get("user-data");

	if (!cookie) {
		return {
			redirect: {
				destination: "/login",
			},
		};
	}

	return {
		props: {},
	};
});

const Home = ({}) => {
	const { data } = useSWR("/api/spotify/playlist");

	return (
		<div className={styles.container}>
			<h1>Test</h1>
			<Link href="/albums">Albums</Link>
			<Link href="/playlists">Playlists</Link>
			<Link href="/statistics">Statistics</Link>
		</div>
	);
};

export default Home;
