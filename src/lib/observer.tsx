import { useState } from "react";
import { useEffect, useRef } from "react";
import classes from "styles/observer.module.scss";

const useObserver = (
	callback: () => {},
	options?: {
		condition?: boolean;
	} & IntersectionObserverInit
) => {
	const ref = useRef(null);
	const [loading, setLoading] = useState(false);

	const { condition, ...rest } = options;

	useEffect(() => {
		const observer = new IntersectionObserver(
			async ([entry]) => {
				if (!entry.isIntersecting || condition || loading) return;
				if (process.env.NEXT_PUBLIC_STATE === "offline") return;

				setLoading(true);
				await callback();
				setLoading(false);
			},
			{
				root: null,
				rootMargin: "256px",
				threshold: 0.0,
				...rest,
			}
		);

		const { current } = ref;

		if (current) observer.observe(current);

		return () => {
			if (current) observer.disconnect();
		};
	});

	const sentinel = !condition && (
		<div ref={ref} className={classes["sentinel"]}>
			Loading...
		</div>
	);

	return sentinel;
};

export default useObserver;
