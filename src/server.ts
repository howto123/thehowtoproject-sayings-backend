/**
 * server.js is the main entry point for the application
 * any objects or funcionality is imported here
 */

import dotenv from 'dotenv';
import * as Web from './web/express';
import { validate } from './services/validation';
import { UserDbLogic } from './services/UserDbLogic';
//import { DbMethodsInMemory } from './database/inmemorydb';
import { DbMethodsPostgres } from './databaseAccess/DbMethodsPostgres';

// settings
dotenv.config();
const port = process.env.PORT;

// create express app object
const app = Web.getApp();

// create db object and expose its methods
const dbMethods = new DbMethodsPostgres();
// const dbMethods = new DbMethodsInMemory(); -> change import as well

// create a logic object and expose its methods
const userDbLogic = new UserDbLogic(dbMethods);
Web.getEndpoints(app, validate, userDbLogic);

// start the server
app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
