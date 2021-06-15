import { useEffect, useRef } from "react";

const useObserver = (
	callback: () => {},
	options?: {
		condition?: boolean;
	} & IntersectionObserverInit
) => {
	const ref = useRef(null);

	const { condition, ...rest } = options;

	useEffect(() => {
		const observer = new IntersectionObserver(
			async ([entry]) => {
				if (!entry.isIntersecting || condition) return;

				await callback();
			},
			{
				root: null,
				rootMargin: "0px",
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

	const observer = !condition && (
		<div ref={ref} className="observer">
			Loading...
		</div>
	);

	return [observer];
};

export default useObserver;
