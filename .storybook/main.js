const path = require("path");

module.exports = {
	stories: ["../src/components/**/*.stories.tsx"],
	addons: ["@storybook/preset-typescript", "@storybook/preset-scss"],
	output: {
    publicPath: "../public"
  },
	presets: [path.resolve(__dirname, "./next-preset.js")],
	webpackFinal: async (baseConfig, { srcFolder }) => {
		const { module = {} } = baseConfig;

		const src = srcFolder || __dirname + "/../src/";

		const config = {
			...baseConfig,
			module: {
				...module,
				rules: [...(module.rules || [])],
			},
		};

		config.module.rules.push({
			test: /\.(ts|tsx)$/,
			include: [path.resolve(__dirname, "../src/components")],
			use: [
				{
					loader: "babel-loader",
					options: {
						presets: [
							"next/babel",
							require.resolve("babel-preset-react-app"),
						],
						plugins: ["react-docgen"],
					},
				},
			],
		});
		config.resolve.extensions.push(".ts", ".tsx");

		config.resolve.alias = {
			...config.resolve.alias,
			components: path.resolve(src, "components"),
			lib: path.resolve(src, "lib"),
			pages: path.resolve(src, "pages"),
			stories: path.resolve(src, "stories"),
			styles: path.resolve(src, "styles"),
		};

		return config;
	},
};
