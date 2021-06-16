import Link from "next/link";
import Image, { ImagesArray } from "../Image/Image";
import classes from "./Cover.module.scss";

type ArtistProps = {
  
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;

}

type CoverProps = {
	artists: Array<ArtistProps>,
	images: ImagesArray;
	name: string;
};

const Cover = ({ artists, images, name }: CoverProps) => (
	<div className={classes["header"]}>
		<Image className={classes["cover"]} images={images} name={name} />
		<h1 className={classes["title"]}>{name}</h1>
		<h2 className={classes["artists"]}>
			{artists.map(({ id: artistId, name }) => (
				<Link href={`/artist/${artistId}`}>{name}</Link>
			))}
		</h2>
	</div>
);

export default Cover;
