import { FC } from "react";

type LoadingProps = {
	className?: string;
	isLoading: boolean;
};

const Loading: FC<LoadingProps> = ({ children, isLoading }) => {
	return <div>{!isLoading ? children : <h2>loading...</h2>}</div>;
};

export default Loading;
