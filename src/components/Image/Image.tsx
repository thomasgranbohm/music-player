import { concat } from "lib/functions";
import { useEffect, useState } from "react";
import NextImage from "next/image";
import classes from "./Image.module.scss";

export type ImagesArray = Array<{ height: number; url: string; width: number }>;

export type ImageProps = {
	className?: string;
	images: ImagesArray;
	look?: "rounded";
	name: string;
	size?: "large" | "medium" | "small";
};

const Image = ({ className, images, look, name, size }: ImageProps) => {
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
		<div
			className={concat(
				classes["container"],
				[classes[size], size],
				classes[look],
				className
			)}
		>
			<NextImage
				src={url}
				alt={name}
				width={512}
				height={512}
				objectFit="cover"
				layout={"responsive"}
				placeholder="blur"
				blurDataURL={`/_next/image?url=${url}&w=8&q=1`}
			/>
		</div>
	);
};
export default Image;
