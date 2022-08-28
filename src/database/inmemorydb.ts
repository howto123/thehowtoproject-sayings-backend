import * as Types from '../types/typeindex';

export class DbMethodsInMemory implements Types.DbMethods {
	private database: Types.SayingEntity[];
	private idCounter: number;

	constructor() {
		this.database = [];
		this.idCounter = 0;
	}

	public async getAll() {
		return this.database.map((e) => ({
			_id: e._id,
			saying: e.saying,
			author: e.author,
			topic: e.topic,
		}));
	}

	public addOne(one: Types.SayingEssential) {
		const moment = new Date();
		one._id = String(++this.idCounter);
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

	public async deleteById(id: Types.Identity) {
		const index = this.database.findIndex((e) => e._id === id);
		return this.database.splice(index, 1)[0];
	}
}
