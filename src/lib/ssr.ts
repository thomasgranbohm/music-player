import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import withSession from "./session";

type GetServerSideProps<
	P extends { [key: string]: any } = { [key: string]: any }
> = (
	context: { cookie: string } & GetServerSidePropsContext
) => Promise<GetServerSidePropsResult<P>>;

export const getSSP = (f: GetServerSideProps) =>
	withSession(async ({ req, ...rest }) => {
		const cookie = req.session.get("user-data");

		if (!cookie) {
			return {
				redirect: {
					destination: "/login",
				},
			};
		}

		return await f({ req, cookie, ...rest });
	});
