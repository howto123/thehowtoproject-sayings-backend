import * as Types from '../imports/typeAndInterfaceIndex';

export interface DbMethods {
	getAll: () => Promise<Types.SayingEssential[]>;
	addOne: (one: Types.SayingEssential) => void;
	deleteById: (id: Types.Identity) => Promise<Types.SayingEssential>;
	modifyOne: (newOne: Types.SayingEssential) => void;

	connect(): Promise<void>;
	disconnect(): Promise<void>;
}
