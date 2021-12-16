import { concat } from "lib/functions";
import { useEffect, useState } from "react";
import NextImage from "next/image";
import classes from "./Image.module.scss";

export type ImagesArray = Array<{ height: number; url: string; width: number }>;

export type ImageProps = {
	className?: string;
	images: ImagesArray;
	name: string;
	size?: "large" | "medium" | "small";
};

const Image = ({ className, images, name, size }: ImageProps) => {
	const reduce = (p, c) => [...p, c["url"]];
	const sort = (a, b) => b.width * b.height - a.width * a.height;
	const [sortedImages, setSortedImages] = useState(
		images.sort(sort).reduce(reduce, [])
	);

	useEffect(() => {
		setSortedImages(images.sort(sort).reduce(reduce, []));
	}, [images]);

	const url = sortedImages[0] || "/images/Spotify_Icon_RGB_White.png";

	return (
		<div className={classes["container"]}>
			<NextImage
				className={concat(
					classes["image"],
					[classes[size], size],
					[className, className]
				)}
				src={url}
				alt={name}
				width={512}
				height={512}
				layout={"responsive"}
				placeholder="blur"
				blurDataURL={`/_next/image?url=${url}&w=8&q=1`}
			/>
		</div>
		// <img
		// 	className={concat(
		// 		classes["image"],
		// 		[classes[size], size],
		// 		[className, className]
		// 	)}
		// 	srcSet={sortedImages
		// 		.map(
		// 			({ height, url, width }) =>
		// 				`${url} ${
		// 					width || height ? `${Math.min(width, height)}w` : ""
		// 				}`
		// 		)
		// 		.join(", ")}
		// 	sizes={sortedImages
		// 		.map(({ width }) => `(min-width: ${width}) ${width}px`)
		// 		.join(", ")}
		// 	alt={name}
		// />
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
