/**
 * This file collects types, that might be used elsewhere
 */

import { Identity, SchemaId } from '../TypesInterfacesAndSchemas/Identity';
import {
	SayingEssential,
	SchemaSayingEssential,
} from '../TypesInterfacesAndSchemas/SayingEssential';
import { SayingEntity, SchemaSayingEntity } from '../TypesInterfacesAndSchemas/SayingEntity';
import { Validatable } from '../services/validation';
import { UserDbInterface, UserDbLogic } from '../services/user-db-logic';
import { DbMethods } from '../databaseAccess/DbMethods';

export {
	Identity,
	SayingEssential,
	SayingEntity,
	SchemaId,
	SchemaSayingEssential,
	SchemaSayingEntity,
	Validatable,
	UserDbInterface,
	UserDbLogic,
	DbMethods,
};
