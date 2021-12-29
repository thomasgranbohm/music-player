export type Followers = {
	href: string | null;
	total: number;
};

export type PagingObject<T> = {
	href: string;
	items: Array<T>;
	limit: number;
	next: string | null;
	offset: number;
	previous: string | null;
	total: number;
};

export interface Owner {
	display_name: string;
	external_urls: {
		[key: string]: string;
	};
	href: string;
	id: string;
	type: string;
	uri: string;
}

export type Image = { height: number; url: string; width: number };
export type ImagesArray = Array<Image>;
