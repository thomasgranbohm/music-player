
import jwt from 'jsonwebtoken';

const nonAuthURIs = [
	'/login',
	'/global.css',
	'/fonts'
]

const auth = async (req, res, next) => {
	if (!req.url.startsWith('/client/')) {
		let some = nonAuthURIs.some(start => req.originalUrl.startsWith(start));
		if (!some) {
			try {
				let cookies = req.header('cookie');
				if (!cookies) throw new Error("No cookie");

				let tokenCookie = cookies.split(";").filter(c => c.startsWith("token"));
				if (tokenCookie.length == 0) throw new Error("No token")

				let token = tokenCookie[0].split("=")[1];
				const data = jwt.verify(token, process.env.JWT_SECRET);
			} catch (err) {
				return res.redirect('/login')
			}
		}
	}
	next();
}

export default auth;