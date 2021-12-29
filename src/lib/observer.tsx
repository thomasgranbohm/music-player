import { useEffect, useRef, useState } from "react";
import classes from "styles/observer.module.scss";

const useObserver = (
	callback: () => {},
	options?: {
		condition?: boolean;
	} & IntersectionObserverInit
) => {
	const ref = useRef(null);
	const [loading, setLoading] = useState(false);

	const { condition: stoppingCondition, ...rest } = options;

	useEffect(() => {
		const observer = new IntersectionObserver(
			async ([entry]) => {
				if (!entry.isIntersecting || stoppingCondition || loading)
					return;
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

	const sentinel = !stoppingCondition && (
		<div ref={ref} className={classes["sentinel"]}>
			Loading...
		</div>
	);

	return sentinel;
};

export default useObserver;
