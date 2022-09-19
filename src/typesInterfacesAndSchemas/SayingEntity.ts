import Joi from 'joi';

import * as Types from '../imports/typeAndInterfaceIndex';

/**
 * extended interface, corresponds to entries in db
 */
export interface SayingEntity extends Types.SayingEssential {
	createdDate: Date;
	modifiedDate: Date;
}

/**
 * schema corresponding to the interface SayingEntity
 */
export const SchemaSayingEntity = Joi.object<SayingEntity>({
	_id: Joi.string().min(0).max(256).required(),
	saying: Joi.string().min(0).max(256).required(),
	author: Joi.string().min(0).max(256).required(),
	topic: Joi.string().min(0).max(256).required(),
	createdDate: Joi.date().required(),
	modifiedDate: Joi.date().required(),
});
