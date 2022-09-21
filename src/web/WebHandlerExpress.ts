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
	expressApp: any;
	expressServer: any;

	constructor(port: string, validate: any, userDbLogic: Types.UserDbLogic) {
		this.port = port;
		this.validate = validate;
		this.userDbLogic = userDbLogic;
	}

	public async getEndpointsAndStartServer() {
		this.expressApp = express();
		this.getEndpoints();
		await this.startServer();
	}

	public async stopServer() {
		this.stop();
	}

	private getEndpoints() {
		getEndpointsImported(this.expressApp, this.validate, this.userDbLogic);
	}

	private async startServer() {
		this.expressServer = await this.expressApp.listen(this.port, () => {
			console.log(`Example app listening on port ${this.port}`);
		});
	}

	private async stop() {
		await this.expressServer.close();
		console.log('stopServer()');
	}
}
