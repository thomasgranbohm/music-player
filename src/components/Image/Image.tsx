import { concat, getSpecificImageSize } from "lib/functions";
import { useEffect, useState } from "react";
import NextImage from "next/image";
import classes from "./Image.module.scss";
import { Image as ImageType, ImagesArray } from "types";

export type ImageProps = {
	className?: string;
	images: ImageType[];
	look?: "rounded";
	name: string;
	size: "large" | "medium" | "small";
};

const Image = ({ className, images, look, name, size }: ImageProps) => {
	const reduce = (p, c) => [...p, c];
	const sort = (a, b) => b.width * b.height - a.width * a.height;
	const [sortedImages, setSortedImages] = useState<ImagesArray>(
		images.sort(sort).reduce(reduce, [])
	);

	useEffect(() => {
		setSortedImages(images.sort(sort).reduce(reduce, []));
	}, [images]);

	const hasSortedImages = sortedImages && sortedImages.length > 0;
	const selected = getSpecificImageSize(images, size);
	const smallest = sortedImages.slice().pop();

	const selectedURL =
		(hasSortedImages && selected && "url" in selected && selected.url) ||
		`${process.env.NEXT_PUBLIC_BASE_PATH}/images/Spotify_Icon_RGB_White.png`;

	const smallestURL =
		(hasSortedImages && smallest && "url" in smallest && smallest.url) ||
		`${process.env.NEXT_PUBLIC_BASE_PATH}/images/Spotify_Icon_RGB_White.png`;

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
				width={(selected && selected.width) || 640}
				height={(selected && selected.height) || 640}
				src={selectedURL}
				alt={name}
				objectFit="cover"
				loading="lazy"
				layout="responsive"
				placeholder="blur"
				blurDataURL={`${process.env.NEXT_PUBLIC_BASE_PATH}/_next/image?url=${smallestURL}&w=16&q=1`}
			/>
		</div>
	);
};
export default Image;
