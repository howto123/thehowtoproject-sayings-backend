/**
 * This file defines express rest endpoints
 * @param {express app} app
 */

import express from 'express';
import bodyParser from 'body-parser';

export function getEndpoints(
	app: express.Application,
	validate: (toBeValidated: unknown) => boolean,
) {
	// set parsing
	app.use(bodyParser.json());

	// first get
	app.get('/', (req: express.Request, res: express.Response) => {
		if (req) res.send('it works!!');
	});

	// create
	app.post('/create', (req, res) => {
		try {
			const { id, saying, author, topic } = req.body;
			const body = req.body;
			if (validate(body)) {
				console.log(id, saying, author, topic);
				res.status(200).send(body);
			}
		} catch (err) {
			res.status(505).send('problem in create endpoint');
			console.log(err.message);
		}
	});

	// read
	app.get('/read', (req, res) => {
		try {
			const { id, saying, author, topic } = req.body;
			const body = req.body;
			if (validate(body)) {
				console.log(id, saying, author, topic);
				res.status(200).send(body);
			}
		} catch (err) {
			res.status(505).send('problem with in read endpoint');
			console.log(err.message);
		}
	});

	// update
	app.get('/update', (req, res) => {
		try {
			const { id, saying, author, topic } = req.body;
			const body = req.body;
			if (validate(body)) {
				console.log(id, saying, author, topic);
				res.status(200).send(body);
			}
		} catch (err) {
			res.status(505).send('problem with update in endpoint');
			console.log(err.message);
		}
	});

	// delete
	app.get('/delete', (req, res) => {
		try {
			const { id, saying, author, topic } = req.body;
			const body = req.body;
			if (validate(body)) {
				console.log(id, saying, author, topic);
				res.status(200).send(body);
			}
		} catch (err) {
			res.status(505).send('problem in delete endpoint');
			console.log(err.message);
		}
	});
}

export function getApp() {
	const app = express();
	return app;
}
