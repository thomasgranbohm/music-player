import { Meta } from "@storybook/react";
import React from "react";
import Cover from "./Cover";

const props = {
	artists: [
		{
			external_urls: {
				spotify:
					"https://open.spotify.com/artist/7Hjbimq43OgxaBRpFXic4x",
			},
			href: "https://api.spotify.com/v1/artists/7Hjbimq43OgxaBRpFXic4x",
			id: "7Hjbimq43OgxaBRpFXic4x",
			name: "Saba",
			type: "artist",
			uri: "spotify:artist:7Hjbimq43OgxaBRpFXic4x",
		},
	],
	images: [
		{
			height: 640,
			url:
				"https://i.scdn.co/image/ab67616d0000b2734bb13f7847252cc829e05aa6",
			width: 640,
		},
		{
			height: 300,
			url:
				"https://i.scdn.co/image/ab67616d00001e024bb13f7847252cc829e05aa6",
			width: 300,
		},
		{
			height: 64,
			url:
				"https://i.scdn.co/image/ab67616d000048514bb13f7847252cc829e05aa6",
			width: 64,
		},
	],
	name: "CARE FOR ME",
};

export const Default = () => <Cover artists={props.artists} images={props.images} name={props.name}  />;

export default {
	title: "Components/Cover",
	component: Cover,
} as Meta;
