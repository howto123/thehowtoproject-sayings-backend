/**
 * This file defines express rest endpoints
 * @param {express app} app
 */

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import * as Types from '../imports/typeAndInterfaceIndex';

/**
 * Installs routes and endpoints using express
 * @param app
 * @param validate
 * @param dbLogic
 */
export default function getEndpoints(
	app: express.Application,
	validate: (option: string, toBeValidated: Types.Validatable) => Types.SayingEssential,
	dbLogic: Types.UserDbLogic,
) {
	// set parsing
	app.use(bodyParser.json());

	// cors options
	/*
	const corsOptions = {
		origin: 'http://localhost:3000',
		optionsSuccessStatus: 200,
	};
	*/
	app.use(cors());

	// first get
	app.get('/', (req: express.Request, res: express.Response) => {
		if (req) res.send('it works!!');
	});

	// create
	app.post('/create', async (req, res) => {
		try {
			const body = req.body;
			const sayingEssential: Types.SayingEssential = validate(
				'create',
				body as Types.Validatable,
			);
			const list = await dbLogic.createSaying(sayingEssential);
			res.status(200).send(list);
		} catch (err) {
			res.status(500).send('problem in create endpoint');
			console.log(err.message);
		}
	});

	// read
	app.get('/read', async (req, res) => {
		try {
			const body = req.body;
			validate('read', body as Types.Validatable);
			const list = await dbLogic.readAllSayings();
			res.status(200).send(list);
		} catch (err) {
			res.status(500).send('problem with in read endpoint');
			console.log(err.message);
		}
	});

	// update
	app.post('/update', async (req, res) => {
		try {
			const body = req.body;
			const sayingEssential: Types.SayingEssential = validate(
				'update',
				body as Types.Validatable,
			);
			const list = await dbLogic.updateSaying(sayingEssential);
			res.status(200).send(list);
		} catch (err) {
			res.status(500).send('problem with update in endpoint');
			console.log(err.message);
		}
	});

	// delete
	app.post('/delete', async (req, res) => {
		try {
			const body = req.body;
			const sayingEssential: Types.SayingEssential = validate(
				'delete',
				body as Types.Validatable,
			);
			const list = await dbLogic.deleteSaying(sayingEssential);
			res.status(200).send(list);
		} catch (err) {
			res.status(500).send('problem in delete endpoint');
			console.log(err.message);
		}
	});
}

export function getApp() {
	const app = express();
	return app;
}
