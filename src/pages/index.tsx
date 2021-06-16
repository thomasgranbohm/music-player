import withSession from "lib/session";

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
		<>
			<h1>Home</h1>
		</>
	);
};

export default Home;
