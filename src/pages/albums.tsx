import { AlbumBlurb } from "components/Blurb/Blurb";
import BlurbListing from "components/BlurbListing/BlurbListing";
import Loading from "components/Loading/Loading";
import { nextInstance } from "lib/api";
import useObserver from "lib/observer";
import { getAlbums } from "lib/spotify";
import { getSSP } from "lib/ssr";
import { useState } from "react";

export const getServerSideProps = getSSP(async ({ cookie }) => {
	const resp = await getAlbums(cookie);

	return {
		props: {
			info: resp,
		},
	};
});

const Albums = ({ info }) => {
	const { items, total } = info;

	const [albums, setAlbums] = useState(items || []);
	const [observer] = useObserver(
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
			<BlurbListing title="albums">
				{albums.map(({ album }) => (
					<AlbumBlurb {...album} key={album.id} />
				))}
			</BlurbListing>
			{observer}
		</Loading>
	);
};

export default Albums;
