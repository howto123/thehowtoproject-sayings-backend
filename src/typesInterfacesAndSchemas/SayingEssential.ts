import Joi from 'joi';

import * as Types from '../imports/typeAndInterfaceIndex';

/**
 * Describes what the user has access to in the frontend
 */
export interface SayingEssential {
	_id: Types.Identity;
	saying: string;
	author: string;
	topic: string;
}

/**
 * schema correspondig to the interface SayingEntity
 */
export const SchemaSayingEssential = Joi.object<SayingEssential>({
	_id: Joi.string().uuid().allow(''),
	saying: Joi.string().min(0).max(256).required(),
	author: Joi.string().min(0).max(256).required(),
	topic: Joi.string().min(0).max(256).required(),
});
