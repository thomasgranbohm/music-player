import { concat } from "lib/functions";
import { useEffect, useState } from "react";
import classes from "./Image.module.scss";

export type ImagesArray = Array<{ height: number; url: string; width: number }>;

export type ImageProps = {
	className?: string;
	images: ImagesArray;
	name: string;
	size?: "large" | "medium" | "small";
};

const Image = ({ className, images, name, size }: ImageProps) => {
	const sortFunction = (arr) =>
		arr.sort((a, b) => b.width * b.height - a.width * a.height);
	const [sortedImages, setSortedImages] = useState(sortFunction(images));

	useEffect(() => {
		setSortedImages(sortFunction(images));
	}, [images]);

	return (
		<img
			className={concat(
				classes["image"],
				[classes[size], size],
				[className, className]
			)}
			srcSet={sortedImages
				.map(
					({ height, url, width }) =>
						`${url} ${
							width || height ? `${Math.min(width, height)}w` : ""
						}`
				)
				.join(", ")}
			sizes={sortedImages
				.map(({ width }) => `(min-width: ${width}) ${width}px`)
				.join(", ")}
			alt={name}
		/>
		// <picture
		// 	className={[
		// 		classes["image"],
		// 		[classes[size], !!size],
		// 		className,
		// 	].join(" ")}
		// >
		// 	{sortedImages.map(({ height, url, width }) => (
		// 		<source
		// 			key={url}
		// 			srcSet={`${url} ${
		// 				width || height ? `${Math.min(width, height)}w` : ""
		// 			}`}
		// 		/>
		// 	))}
		// 	<img
		// 		src="/images/Spotify_Icon_RGB_White.png"
		// 		alt={name}
		// 		loading="lazy"
		// 	/>
		// </picture>
	);
};
export default Image;
