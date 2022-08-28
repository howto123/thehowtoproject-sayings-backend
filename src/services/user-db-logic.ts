import * as Types from '../types/typeindex';

export interface UserDbInterface {
	readAllSayings(): Promise<Types.SayingEssential[]>;
	createSaying(saying: Types.SayingEssential): Promise<Types.SayingEssential[]>;
	updateSaying(saying: Types.SayingEssential): Promise<Types.SayingEssential[]>;
	deleteSaying(saying: Types.SayingEssential): Promise<Types.SayingEssential[]>;
}
export class UserDbLogic implements UserDbInterface {
	private dbMethods: Types.DbMethods;

	constructor(dbMethods: Types.DbMethods) {
		this.dbMethods = dbMethods;
	}

	public async readAllSayings() {
		return await this.dbMethods.getAll();
	}

	public async createSaying(saying: Types.SayingEssential) {
		this.dbMethods.addOne(saying);
		return await this.dbMethods.getAll();
	}

	public async updateSaying(saying: Types.SayingEssential) {
		this.dbMethods.modifyOne(saying);
		return await this.dbMethods.getAll();
	}
	public async deleteSaying(saying: Types.SayingEssential) {
		await this.dbMethods.deleteById(saying._id);
		return await this.dbMethods.getAll();
	}
}
