import axios from "axios";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { PlaylistBlurb } from "../components/Blurb/Blurb";
import BlurbListing from "../components/BlurbListing/BlurbListing";
import Loading from "../components/Loading/Loading";
import { nextInstance } from "../lib/api";
import useObserver from "../lib/observer";
import withSession from "../lib/session";
import { getPlaylists } from "../lib/spotify";

export const getServerSideProps = withSession(async ({ req, res }) => {
	const cookie = await req.session.get("user-data");

	if (!cookie) {
		return {
			redirect: {
				destination: "/login",
			},
		};
	}

	const resp = await getPlaylists(cookie);

	return {
		props: {
			info: resp,
		},
	};
});

const Playlists = ({ info }) => {
	const { items, total } = info;

	const [playlists, setPlaylists] = useState(items);

	const [observer] = useObserver(
		async () => {
			const { data } = await nextInstance(
				`/spotify/playlists?offset=${playlists.length}`
			);

			setPlaylists([...playlists, ...data.items]);
		},
		{
			condition: total === playlists.length,
		}
	);

	return (
		<Loading isLoading={!playlists}>
			<BlurbListing title="playlists">
				{playlists &&
					playlists.map((item) => (
						<PlaylistBlurb {...item} key={item.id} />
					))}
			</BlurbListing>
			{observer}
		</Loading>
	);
};

export default Playlists;
