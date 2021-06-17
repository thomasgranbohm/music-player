import LinkListing from "./LinkListing";

const props = {
	links: [
		{
			title: "Saba",
			link: "/",
		},
		{
			title: "Saba",
			link: "/",
		},
		{
			title: "Saba",
			link: "/",
		},
	],
};

export const Default = () => <LinkListing {...props} />;

export default {
	title: "Components/LinkListing",
	component: LinkListing,
};
