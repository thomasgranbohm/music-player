import useSWR from "swr";
import { AlbumBlurb } from "../components/Blurb/Blurb";
import BlurbListing from "../components/BlurbListing/BlurbListing";
import Loading from "../components/Loading/Loading";
import withSession from "../lib/session";

export const getServerSideProps = withSession(async ({ req, res }) => {
	const cookie = await req.session.get("user-data");

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

const Playlists = () => {
	const { data, error } = useSWR("/api/spotify/albums");

	if (error) return <h1>error</h1>;
	// if (!data) return <h1>loading...</h1>;

	return (
		<Loading isLoading={!data}>
			<BlurbListing title="albums">
				{data?.items &&
					data.items.map((item) => (
						<AlbumBlurb type="album" {...item.album} />
					))}
			</BlurbListing>
		</Loading>
	);
};

export default Playlists;
