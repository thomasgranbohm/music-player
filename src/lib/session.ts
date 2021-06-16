import { Handler, withIronSession } from "next-iron-session";

const withSession = (handler: Handler) =>
	withIronSession(handler, {
		cookieName: "music-token",
		password: process.env.SECRET,
		ttl: 3600,
		cookieOptions: {
			secure: process.env.NODE_ENV === "production",
		},
	});

export default withSession;
