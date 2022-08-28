import * as Types from '../types/typeindex';

export interface DbMethods {
	getAll: () => Types.SayingEssential[];
	addOne: (one: Types.SayingEssential) => void;
	deleteById: (id: Types.Identity) => Types.SayingEssential;
	modifyOne: (newOne: Types.SayingEssential) => void;
}

export class DbMethodsPostgres implements DbMethods {
	private database: Types.SayingEntity[];

	constructor() {
		this.database = [];
	}

	public getAll() {
		return this.database.map((e) => ({
			_id: e._id,
			saying: e.saying,
			author: e.author,
			topic: e.topic,
		}));
	}

	public addOne(one: Types.SayingEssential) {
		const moment = new Date();
		this.database.push({ ...one, createdDate: moment, modifiedDate: moment });
	}

	public modifyOne(newOne: Types.SayingEssential) {
		const index = this.database.findIndex((e) => e._id === newOne._id);
		this.database[index] = {
			...newOne,
			createdDate: this.database[index].createdDate,
			modifiedDate: new Date(),
		};
	}

	public deleteById(id: Types.Identity) {
		const index = this.database.findIndex((e) => e._id === id);
		return this.database.splice(index, 1)[0];
	}
}
