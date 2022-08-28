/**
 * server.js is the main entry point for the application
 * any objects or funcionality is imported here
 */

import dotenv from 'dotenv';
import * as Web from './web/web';
import { validate } from './services/validation';
import { UserDbLogic } from './services/user-db-logic';

dotenv.config();
const port = process.env.PORT;

const app = Web.getApp();
const dbMethods = new DbMethods();
const dbLogic = new UserDbLogic(dbMethods);
Web.getEndpoints(app, validate, dbLogic);

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
