import * as Types from '../types/typeindex';

export interface DbMethods {
	getAll: () => Types.SayingEssential[];
	addOne: (one: Types.SayingEssential) => void;
	deleteById: (id: Types.Identity) => Types.SayingEssential;
	modifyOne: (newOne: Types.SayingEssential) => void;
}
