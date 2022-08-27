/**
 * server.js is the main entry point for the application
 * any objects or funcionality is imported here
 */

import dotenv from 'dotenv';
import * as Web from './web/web';
import { validate } from './services/validation';

dotenv.config();
const port = process.env.PORT;

const app = Web.getApp();
Web.getEndpoints(app, validate);

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
