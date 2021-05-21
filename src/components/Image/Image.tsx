import classes from "./Image.module.scss";

export type ImagesArray = [{ height: number; url: string; width: number }];

export type ImageProps = {
	className?: string;
	images: [{ height: number; url: string; width: number }];
	name: string;
	size: "large" | "medium" | "small";
};

const Image = ({ className, images, name, size }: ImageProps) => {
	const sizeSortedImages = images.sort(
		(a, b) => a.width * a.height - b.width * b.height
	);

	let image = undefined;
	if (size === "large") image = sizeSortedImages.slice().pop();
	else if (size === "medium")
		image =
			sizeSortedImages.slice()[Math.floor(sizeSortedImages.length / 2)];
	else if (size === "small") image = sizeSortedImages.slice().shift();

	return (
		<img
			className={[classes["image"], className].join(" ")}
			alt={name}
			src={image.url}
		/>
	);
};
export default Image;
