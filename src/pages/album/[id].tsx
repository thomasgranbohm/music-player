import { GetServerSideProps } from "next";
import { getAlbum } from "../../lib/spotify";
import { getSSP } from "../../lib/ssr";

export const getServerSideProps: GetServerSideProps = getSSP(
	async ({ cookie, query }) => {
		const { id } = query;

		const album = await getAlbum(cookie, id);

		return { props: { album } };
	}
);

const Album = ({ album }) => {
	return (
		<>
			<pre>
				<code>{JSON.stringify(album, null, 4)}</code>
			</pre>
		</>
	);
};

export default Album;
