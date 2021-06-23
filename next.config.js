const path = require("path");
const { webpackFinal } = require("./.storybook/main");

module.exports = {
	webpack: (config, { storybook = false }) => {
		webpackFinal(config, {
			srcFolder: path.resolve(__dirname, "src"),
		});

		return config;
	},
	images: {
		domains: ["i.scdn.co", "mosaic.scdn.co"],
	},
};
