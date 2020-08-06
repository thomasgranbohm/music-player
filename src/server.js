import sirv from 'sirv';
import express, { Router } from 'express';
import compression from 'compression';
import * as sapper from '@sapper/server';
import router from './api/router';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import middleware from './api/middleware';


const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const app = express();


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())

app.use('/api', router);

app.use(
	compression({ threshold: 0 }),
	middleware,
	sirv('static', { dev }),
	sapper.middleware()
)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});
