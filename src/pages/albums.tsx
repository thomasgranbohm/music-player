import { AlbumBlurb } from "components/Blurb/Blurb";
import BlurbListing from "components/BlurbListing/BlurbListing";
import Loading from "components/Loading/Loading";
import PageTitle from "components/PageTitle/PageTitle";
import { nextInstance } from "lib/api";
import useObserver from "lib/observer";
import { getAlbums } from "lib/spotify";
import { getSSP } from "lib/ssr";
import { NextSeo } from "next-seo";
import { useState } from "react";

export const getServerSideProps = getSSP(async ({ cookie }) => {
	const info = await getAlbums(cookie);

	return {
		props: {
			info,
		},
	};
});

const Albums = ({ info }) => {
	const { items, total } = info;

	const [albums, setAlbums] = useState(items || []);
	const sentinel = useObserver(
		async () => {
			const { data } = await nextInstance(
				`/spotify/albums?offset=${albums.length}`
			);

			setAlbums([...albums, ...data.items]);
		},
		{
			threshold: 0.5,
			condition: total === albums.length,
		}
	);

	return (
		<Loading isLoading={!info}>
			<NextSeo title="Albums" />
			<BlurbListing title="albums">
				{albums.map(({ album }) => (
					<AlbumBlurb {...album} key={album.id} />
				))}
			</BlurbListing>
			{sentinel}
		</Loading>
	);
};

export default Albums;
