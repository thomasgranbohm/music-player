import { useState } from "react";
import { PlaylistBlurb } from "components/Blurb/Blurb";
import BlurbListing from "components/BlurbListing/BlurbListing";
import Loading from "components/Loading/Loading";
import { nextInstance } from "lib/api";
import useObserver from "lib/observer";
import { getPlaylists } from "lib/spotify";
import { getSSP } from "lib/ssr";
import PageTitle from "components/PageTitle/PageTitle";
import { NextSeo } from "next-seo";

export const getServerSideProps = getSSP(async ({ cookie }) => {
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

	const sentinel = useObserver(
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
			<NextSeo title="Playlists" />
			<BlurbListing title="playlists">
				{playlists &&
					playlists.map((item) => (
						<PlaylistBlurb {...item} key={item.id} />
					))}
			</BlurbListing>
			{sentinel}
		</Loading>
	);
};

export default Playlists;
