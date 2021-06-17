import { GetServerSideProps } from "next";
import Image from "components/Image/Image";
import Link from "components/Link/Link";
import { getAlbum } from "lib/spotify";
import { getSSP } from "lib/ssr";

import classes from "styles/Album.module.scss";
import Cover from "../../components/Cover/Cover";

export const getServerSideProps: GetServerSideProps = getSSP(
	async ({ cookie, query }) => {
		const { id } = query;

		const album = await getAlbum(cookie, id);

		return { props: { album } };
	}
);

const Album = ({ album }) => {
	const { artists, genres, id, images, name, tracks, type } = album;
	return (
		<div className={classes["container"]}>
			<Cover
				className={classes["header"]}
				images={images}
				name={name}
				artists={artists}
			/>
			{/* <div className={classes["header"]}>
				<Image
					className={classes["cover"]}
					images={images}
					name={name}
				/>
				<h1 className={classes["title"]}>{name}</h1>
				<h2 className={classes["artists"]}>
					{artists.map(({ id: artistId, name }) => (
						<Link href={`/artist/${artistId}`}>{name}</Link>
					))}
				</h2>
			</div> */}
			<pre>
				<code>
					{JSON.stringify(
						{ artists, genres, id, images, name, type },
						null,
						4
					)}
				</code>
			</pre>
		</div>
	);
};

export default Album;
