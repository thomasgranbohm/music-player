export type ImagesArray = [{ height: number; url: string; width: number }];

export type ImageProps = {
	className: string;
	images: [{ height: number; url: string; width: number }];
	name: string;
};

const Image = ({ className, images, name }: ImageProps) => (
	<img className={className} alt={name} src={images[0].url} />
);

export default Image;
