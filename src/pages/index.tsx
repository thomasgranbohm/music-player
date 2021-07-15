import Heading from "components/Heading/Heading";
import PageTitle from "components/PageTitle/PageTitle";
import withSession from "lib/session";

export const getServerSideProps = withSession(async ({ req }) => {
	const cookie = req.session.get("user-data");

	if (!cookie && !process.env.NEXT_PUBLIC_OFFLINE) {
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
			<PageTitle title="Statistics" />
			<Heading type="h1">Home</Heading>
		</>
	);
};

export default Home;
