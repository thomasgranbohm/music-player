import jwt from "jsonwebtoken";

const nonAuthURIs = ["/login", "/global.css", "/fonts"];

const { JWT_SECRET, BASE_URL } = process.env;

const auth = async (req, res, next) => {
	console.log(req.originalUrl);
	if (!req.url.startsWith("/client/")) {
		let some = nonAuthURIs.some((start) => {
			return req.url.startsWith(start);
		});
		if (!some) {
			try {
				let cookies = req.header("cookie");
				if (!cookies) throw new Error("No cookie");

				let tokenCookie = cookies
					.split(";")
					.filter((c) => c.startsWith("token"));
				if (tokenCookie.length == 0) throw new Error("No token");

				let token = tokenCookie[0].split("=")[1];
				const data = jwt.verify(token, JWT_SECRET);
			} catch (err) {
				console.error(err);
				return res.redirect("/login");
			}
		}
	}
	next();
};

export default auth;
