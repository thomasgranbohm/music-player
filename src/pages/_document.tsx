import Document, { Html, Head, Main, NextScript } from "next/document";

class CustomDocument extends Document {
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx);
		return { ...initialProps };
	}

	render() {
		return (
			<Html>
				<Head>
					<base href={process.env.NEXT_PUBLIC_BASE_URL} />
				</Head>
				{/* <body className="dark"> */}
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default CustomDocument;
