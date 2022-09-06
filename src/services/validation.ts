/**
 * This file contains and exports functionality for (type) validation
 */

import * as Types from '../types/typeindex';

export interface Validatable {
	_id?: Types.Identity | undefined;
	saying?: string | undefined;
	author?: string | undefined;
	topic?: string | undefined;
}

/**
 * throws error if toBeValidated is not valid or a false option gets passed in
 * @param option: 'create', 'read', 'update', 'delete'
 * @param toBeValidated
 * @returns
 */
export function validate(option: string, toBeValidated: any): Types.SayingEssential {
	// define schema (for readability)
	const schema = Types.SchemaSayingEssential;
	const schemaId = Types.SchemaId;

	// deconstruct args
	const { _id, saying, author, topic } = toBeValidated;

	// declare and build object, that can be validated
	let modifiedObject: Types.Validatable;
	switch (option) {
		case 'create': {
			modifiedObject = {
				_id: '',
				saying: saying,
				author: author,
				topic: topic,
			};
			break;
		}
		case 'read': {
			// nothing tested, anything is valid
			return;
		}
		case 'update': {
			// only id is checked, a saying CAN be set to empty row
			const validId = schemaId.validate(_id);
			if (validId.error) {
				throw new Error(validId.error.message);
			}
			modifiedObject = {
				_id: _id,
				saying: saying || '',
				author: author || '',
				topic: topic || '',
			};
			break;
		}
		case 'delete': {
			const validId = schemaId.validate(_id);
			if (validId.error) {
				throw new Error(validId.error.message);
			}
			modifiedObject = {
				_id: _id,
				saying: '',
				author: '',
				topic: '',
			};
			break;
		}
		default:
			throw new Error('invalid validation option');
	}

	// do the validation
	const validated = schema.validate(modifiedObject);

	// throw error if validation fails
	if (validated.error) {
		throw new Error(validated.error.message);
	}
	// if no error, we return the value
	return validated.value;
}
