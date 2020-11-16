import * as sapper from "@sapper/server";
import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import express from "express";
import sirv from "sirv";
import middleware from "./api/middleware";
import router from "./api/router";

const { PORT, NODE_ENV, BASE_URL } = process.env;
const dev = NODE_ENV === "development";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api", router)
	.use(
		BASE_URL,
		compression({ threshold: 0 }),
		middleware,
		sirv("static", { dev }),
		sapper.middleware()
	)
	.listen(PORT, (err) => {
		if (err) console.log("error", err);
	});
