import sirv from 'sirv';
import express, { Router } from 'express';
import compression from 'compression';
import * as sapper from '@sapper/server';
import APIRouter from './api/APIRouter';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import auth from './api/auth';


const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const app = express();


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())

app.use('/api', APIRouter);

app.use(
	compression({ threshold: 0 }),
	auth,
	sirv('static', { dev }),
	sapper.middleware()
)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});
