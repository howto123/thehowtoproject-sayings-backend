import { describe, test, expect } from '@jest/globals';

import { WebHandlerExpress } from './WebHandlerExpress';
import { UserDbLogic } from '../services/UserDbLogic';
import { DbMethodsInMemory } from '../databaseAccess/DbMethodsInMemory';

describe('constructor', () => {
	test('Object creation should work', () => {
		// setup
		const myfunct = () => 'hello';
		const db = new DbMethodsInMemory();
		const logic = new UserDbLogic(db);
		const handler = new WebHandlerExpress('3002', myfunct, logic);

		// assertions
		expect.assertions(2);
		expect(handler).toBeDefined();
		expect(handler).toBeInstanceOf(WebHandlerExpress);
	});

	test('stopServer should exist', () => {
		// setup
		const myfunct = () => 'hello';
		const db = new DbMethodsInMemory();
		const logic = new UserDbLogic(db);
		const handler = new WebHandlerExpress('3002', myfunct, logic);

		// assertions
		expect.assertions(1);
		expect(handler.stopServer).toBeDefined();
		handler.stopServer();

		// REVIEWER: functionality of this method is not tested -> how could this be done?"
	});

	test('Object members should be initialized', () => {
		// setup
		const myfunct = () => 'hello';
		const db = new DbMethodsInMemory();
		const logic = new UserDbLogic(db);
		const handler = new WebHandlerExpress('3002', myfunct, logic);
		handler.getEndpointsAndStartServer();

		// assertions
		expect.assertions(7);
		expect(handler.port).toBeDefined();
		expect(handler.port).toEqual('3002');
		expect(handler.validate).toBeDefined();
		expect(handler.userDbLogic).toBeDefined();
		expect(handler.userDbLogic).toBeInstanceOf(UserDbLogic);
		expect(handler.expressApp).toBeDefined();
		// expect(handler.expressApp).toBeInstanceOf(Application); -> not working. how to do instead?
		// https://bobbyhadz.com/blog/typescript-instanceof-only-refers-to-type-but-is-being-used-as-value
		expect(handler.expressServer).toBeDefined();

		handler.stopServer();
	});
});
