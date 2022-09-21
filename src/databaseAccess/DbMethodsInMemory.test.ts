import { jest, test, describe, expect } from '@jest/globals';

import { DbMethods } from './DbMethods';
import { DbMethodsInMemory } from './DbMethodsInMemory';
//import { SayingEssential } from '/typesInterfacesSchemas/SayingEssential';

describe('DbMethodsInMemory', () => {
	test('Obect should be created', () => {
		const db: DbMethods = new DbMethodsInMemory();

		expect.assertions(2);
		expect(db).toBeDefined();
		expect(db).toBeInstanceOf(DbMethodsInMemory);
	});
	test('connect()', async () => {
		const db: DbMethods = new DbMethodsInMemory();

		jest.spyOn(db, 'connect');
		expect.assertions(3);

		expect(db.connect).toBeDefined();

		await db.connect();

		expect(db.connect).toBeCalledTimes(1);
		expect(db.connect).toReturn();
	});
	test('disconnect()', async () => {
		const db: DbMethods = new DbMethodsInMemory();

		jest.spyOn(db, 'disconnect');
		expect.assertions(3);

		expect(db.disconnect).toBeDefined();

		await db.disconnect();

		expect(db.disconnect).toBeCalledTimes(1);
		expect(db.disconnect).toReturn();
	});
	/*
	test('getAll()', async () => {
		const db: DbMethods = new DbMethodsInMemory();
		const content: SayingEssential[] = [
			{
				_id: 'aaa',
				saying: 'saying1',
				author: 'author1',
				topic: 'topic1',
			},
			{
				_id: 'bbb',
				saying: 'saying2',
				author: 'author2',
				topic: 'topic2',
			},
			{
				_id: 'aaccca',
				saying: 'saying3',
				author: 'author3',
				topic: 'topic3',
			},
		];
		// REVIEVER: database is private. is there a way to access it in the test, without making it public?
		//db.database = content; -> not possible
		expect(await db.getAll()).toEqual(content);
	});
	*/

	//... needs to be completed
});
