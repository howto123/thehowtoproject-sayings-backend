import express from 'express';

import getEndpointsImported from './express';
import * as Types from '../imports/typeAndInterfaceIndex';

/**
 * This class uses Express to organise server behaviour. No express imports elswhere in the code.
 */
export class WebHandlerExpress {
	validate: any;
	userDbLogic: Types.UserDbLogic;
	port: string;
	expressApp: express.Application;
	expressServer: any;

	constructor(port: string, validate: any, userDbLogic: Types.UserDbLogic) {
		this.port = port;
		this.validate = validate;
		this.userDbLogic = userDbLogic;
	}

	public async getEndpointsAndStartServer() {
		this.expressApp = express();
		this.getEndpoints();
		this.startServer();
	}

	public async stopServer() {
		this.stop();
	}

	private getEndpoints() {
		getEndpointsImported(this.expressApp, this.validate, this.userDbLogic);
	}

	private startServer() {
		this.expressServer = this.expressApp.listen(this.port, () => {
			console.log(`Example app listening on port ${this.port}`);
		});
	}

	private stop() {
		this.expressServer.close();
		console.log('stopServer()');
	}
}
