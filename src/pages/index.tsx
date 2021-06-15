import withSession from "../lib/session";
import styles from "../styles/Home.module.css";

export const getServerSideProps = withSession(async ({ req }) => {
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
	return (
		<div className={styles.container}>
			<h1>Home</h1>
		</div>
	);
};

export default Home;
