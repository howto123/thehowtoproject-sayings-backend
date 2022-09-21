import dotenv from 'dotenv';
import { validate } from './services/validation';
import { UserDbLogic } from './services/UserDbLogic';
//import { DbMethodsInMemory } from './databaseAccess/DbMethodsInMemory';
import { DbMethodsPostgres } from './databaseAccess/DbMethodsPostgres';
import { DbMethods } from './databaseAccess/DbMethods';
import { WebHandlerExpress } from './web/WebHandlerExpress';

export class App {
	// REVIEWER: i made a class in order to be able to test the app. is there another way?
	dbMethods: DbMethods;
	userDbLogic: UserDbLogic;
	port: string;
	webHandler: WebHandlerExpress;

	async startUp() {
		// settings
		dotenv.config();
		this.port = process.env.PORT;

		// create and inject objects
		this.dbMethods = await DbMethodsPostgres.getInstance();
		//this.dbMethods = new DbMethodsInMemory(); // -> change import as well (REVIEWER: leave here or delete?)
		this.userDbLogic = new UserDbLogic(this.dbMethods);
		this.webHandler = new WebHandlerExpress(this.port, validate, this.userDbLogic);

		await this.dbMethods.connect();
		await this.webHandler.getEndpointsAndStartServer();

		console.log('start up completed');
	}

	async shutDown() {
		await this.webHandler.stopServer();
		await this.dbMethods.disconnect();

		console.log('shut down completed');
	}
}
