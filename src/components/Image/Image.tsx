import classes from "./Image.module.scss";

export type ImagesArray = [{ height: number; url: string; width: number }];

export type ImageProps = {
	className?: string;
	images: [{ height: number; url: string; width: number }];
	name: string;
	size?: "large" | "medium" | "small";
};

const Image = ({ className, images, name, size }: ImageProps) => {
	const sizeSortedImages = images.sort(
		(a, b) => b.width * b.height - a.width * a.height
	);

	return (
		<picture className={[classes["image"], className].join(" ")}>
			{sizeSortedImages.map(({ height, url, width }) => (
				<source
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
