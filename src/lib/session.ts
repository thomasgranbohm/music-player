import { NextApiRequest, NextApiResponse } from "next";
import { Session, withIronSession } from "next-iron-session";

const withSession = (handler) =>
	withIronSession(handler, {
		cookieName: "music-token",
		password: process.env.SECRET,
		ttl: 3600,
		cookieOptions: {
			secure: process.env.NODE_ENV === "production",
		},
	});

export default withSession;
