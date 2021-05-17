import styles from "../styles/Home.module.css";
import useSWR from "swr";
import withSession from "../lib/session";

export const getServerSideProps = withSession(async ({ req, res }) => {
	const cookie = req.session.get("cookie");

	if (!cookie) {
		return {
			redirect: {
				destination: "/login",
			},
		};
	}

	return {
		props: {
			cookie,
		},
	};
});

const Home = ({ cookie }) => {
	const { data, error } = useSWR("/api/spotify/playlist");

	return (
		<div className={styles.container}>
			<h1>Test</h1>
			<pre>
				<code>{JSON.stringify(data, null, 4)}</code>
			</pre>
		</div>
	);
};

export default Home;
