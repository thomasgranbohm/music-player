import { ImagesArray } from "types";

export const concat = (
	...inputs: (string | [string | undefined, any] | undefined)[]
) =>
	inputs
		.filter((p) => {
			if (p === undefined || p === null) return false;
			if (typeof p === "string") return true;
			if (!!p.pop()) return true;
			return false;
		})
		.join(" ");

export const parseDate = (date: number | Date, text = false) => {
	const d = typeof date === "number" ? new Date(date) : date;

	return `${d.getMinutes()}:${d.getSeconds().toString().padStart(2, "0")}${
		text ? " min" : ""
	}`.padStart(4, "0");
};

export const readableNumber = (n: number | string, delimiter: string = " ") => {
	const a = typeof n === "number" ? new String(n) : n;
	const b = [];

	for (let i = a.length; i >= 0; i--) {
		b.push(a[i]);
		if ((a.length - i) % 3 === 0) b.push(delimiter);
	}

	return b.reverse().join("");
};

export const getSpecificImageSize = (
	images: ImagesArray,
	size: "large" | "medium" | "small"
) => {
	const sort = (a, b) => b.width * b.height - a.width * a.height;
	const sorted = images.sort(sort);

	switch (size) {
		case "large":
			return sorted.slice().shift();
		case "medium":
			return sorted.slice()[Math.floor(sorted.length / 2)];
			throw new Error("Not implemented yet");
		case "small":
			return sorted.slice().pop();
	}
};
