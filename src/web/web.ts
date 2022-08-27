/**
 * This file defines express rest endpoints
 * @param {express app} app
 */
import express from 'express';

export function getEndpoints(app: express.Application) {
	// first get
	app.get('/', (req: express.Request, res: express.Response) => {
		if (req) res.send('GET request to the homepage');
	});
}

export function getApp() {
	const app = express();
	return app;
}
