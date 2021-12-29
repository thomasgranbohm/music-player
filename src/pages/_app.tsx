import Layout from "components/Layout/Layout";
import { DefaultSeo } from "next-seo";
import "styles/globals.scss";

function MyApp({ Component, pageProps }) {
	return (
		<>
			<DefaultSeo
				defaultTitle="Music Player"
				titleTemplate="%s | Music Player"
			/>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</>
	);
}

export default MyApp;
