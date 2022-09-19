import Joi from 'joi';

export type Identity = string;

/**
 * Schema corresponding to the type Identity
 */
export const SchemaId = Joi.string().uuid({ version: 'uuidv4' }).required();
