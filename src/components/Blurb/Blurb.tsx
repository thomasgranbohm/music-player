import classes from "./Blurb.module.scss";

type BlurbProps = {
	type: "playlist";
	images: [
		{
			url: string;
		}
	];
	name: string;
	owner: {
		display_name: string;
		external_urls: { spotify: string };
	};
};

const Blurb = ({ images, name, owner, type }: BlurbProps) => {
	return (
		<div className={[classes["blurb"], classes[type]].join(" ")}>
			<img className={classes["cover"]} src={images[0].url} alt="" />
			<p className={classes["title"]} title={name}>
				<b>{name}</b>
			</p>
			<p className={classes["sub-title"]}>{owner.display_name}</p>
		</div>
	);
};

export default Blurb;
