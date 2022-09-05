import { validate } from '../src/services/validation';
import { describe, test, expect } from '@jest/globals';

// some data to use as args
const emptyObj = {
	_id: '',
	saying: '',
	author: '',
	topic: '',
};
const arr = [
	{
		_id: 'a2e8f11c-79d1-47ed-8cc9-a202ef641de5',
		saying: '',
		author: '',
		topic: '',
	},
	{ name: 'someName' },
	{
		saying: '',
		author: '',
		topic: '',
	},
	{
		_id: 3,
		saying: '',
		author: '',
		topic: '',
	},
	{
		_id: '',
		saying: '',
		author: '',
		topic: '',
		topic_2: 4,
	},
];

// actual tests
describe('tests validate with option create', () => {
	test('Valid: uuid, other fields empty', () => {
		expect(validate('create', arr[0])).toEqual(emptyObj);
	});
	test('Wrong key', () => {
		expect(() => validate('create', arr[1])).toThrow();
	});

	test('Id property is missing', () => {
		expect(validate('create', arr[2])).toEqual(emptyObj);
	});
	test('Puts in number instead of string', () => {
		expect(validate('create', arr[3])).toEqual(emptyObj);
	});
	test('Puts in too many properties', () => {
		expect(validate('create', arr[4])).toEqual(emptyObj);
	});
});
