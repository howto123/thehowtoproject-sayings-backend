/**
 * server.js is the main entry point for the application
 * any objects or funcionality is imported here
 */

import dotenv from 'dotenv';
import * as Web from './web/web';
import { validate } from './services/validation';
import { UserDbLogic } from './services/user-db-logic';
import { DbMethodsInMemory } from './database/database';

// settings
dotenv.config();
const port = process.env.PORT;

// create express app object
const app = Web.getApp();

// create db object and expose its methods
const dbMethods = new DbMethodsInMemory();

// create a logic object and expose its methods
const userDbLogic = new UserDbLogic(dbMethods);
Web.getEndpoints(app, validate, userDbLogic);

// start the server
app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
