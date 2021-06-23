import { useState } from "react";
import classes from "./Image.module.scss";
import NextImage from "next/image";

export type ImagesArray = Array<{ height: number; url: string; width: number }>;

export type ImageProps = {
	className?: string;
	images: ImagesArray;
	name: string;
	size?: "large" | "medium" | "small";
};

const Image = ({ className, images, name, size }: ImageProps) => {
	const [sortedImages, setSortedImages] = useState(
		images.sort((a, b) => b.width * b.height - a.width * a.height)
	);

	return (
		<picture className={[classes["image"], className].join(" ")}>
			{sortedImages.map(({ height, url, width }) => (
				<source
					key={url}
					srcSet={`${url} ${
						width || height ? `${Math.min(width, height)}w` : ""
					}`}
				/>
			))}
			<img src="/images/Spotify_Icon_RGB_White.png" alt={name} />
		</picture>
	);
};
export default Image;
