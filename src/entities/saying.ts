/**
 * This file contains schemas vor validation via joi as well as types related
 * to the saying entity.
 */

import Joi from 'joi';

/**
 * Interface for the members that the user sees
 */
export type Identity = string;

/**
 * Schema corresponding to the type Identity
 */
export const SchemaId = Joi.string().uuid({ version: 'uuidv4' }).required();

/**
 * Objecttype that is visible in the browser and important for the actions available to the user
 */
export interface SayingEssential {
	_id: Identity;
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

/**
 * extended interface, corresponds to entries in db
 */
export interface SayingEntity extends SayingEssential {
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
