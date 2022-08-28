import * as Types from '../types/typeindex';

export interface Validatable {
	id?: Types.Identity | undefined;
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
export function validate(option: string, toBeValidated: Types.Validatable): Types.SayingEssential {
	if (option === 'create') {
		// improve using JOI later
		const { saying, author, topic } = toBeValidated;
		if (saying && author && topic) {
			return {
				_id: '',
				saying: saying,
				author: author,
				topic: topic,
			};
		}
	}
	if (option === 'read') {
		// reading is always allowed
		return {
			_id: '',
			saying: '',
			author: '',
			topic: '',
		};
	}
	if (option === 'update') {
		const { id, saying, author, topic } = toBeValidated;
		if (id && (saying || author || topic)) {
			return {
				_id: id,
				saying: saying || '',
				author: author || '',
				topic: topic || '',
			};
		}
	}
	if (option === 'delete') {
		const { id } = toBeValidated;
		if (id) {
			return {
				_id: id,
				saying: '',
				author: '',
				topic: '',
			};
		}
	}
	throw new Error('invalid option or invalid toBeValidated');
}
