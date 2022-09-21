import * as Types from '../imports/typeAndInterfaceIndex';

export class DbMethodsInMemory implements Types.DbMethods {
	private database: Types.SayingEntity[];
	private idCounter: number;

	constructor() {
		this.database = [];
		this.idCounter = 0;
	}

	// usless here, but necessairy to implement DbMethods
	public connect(): Promise<void> {
		console.log('inmemory db connected');
		return new Promise<void>((resolve) => {
			resolve();
		});
	}

	// usless here, but necessairy to implement DbMethods
	public disconnect(): Promise<void> {
		console.log('inmemory db disconnected');

		return new Promise<void>((resolve) => {
			resolve();
		});
	}

	public getAll(): Promise<Types.SayingEssential[]> {
		const promise = new Promise<Types.SayingEssential[]>((resolve) => {
			const all = this.database.map((e) => ({
				_id: e._id,
				saying: e.saying,
				author: e.author,
				topic: e.topic,
			}));
			resolve(all);
		});
		return promise;
	}

	public addOne(one: Types.SayingEssential): void {
		const moment = new Date();
		one._id = String(++this.idCounter);
		this.database.push({ ...one, createdDate: moment, modifiedDate: moment });
	}

	public modifyOne(newOne: Types.SayingEssential): void {
		const index = this.database.findIndex((e) => e._id === newOne._id);
		this.database[index] = {
			...newOne,
			createdDate: this.database[index].createdDate,
			modifiedDate: new Date(),
		};
	}

	public async deleteById(id: Types.Identity): Promise<Types.SayingEssential> {
		const index = this.database.findIndex((e) => e._id === id);
		const deleted = this.database.splice(index, 1)[0];
		const promise = new Promise<Types.SayingEssential>((resolve) => {
			resolve(deleted);
		});
		return promise;
	}
}
