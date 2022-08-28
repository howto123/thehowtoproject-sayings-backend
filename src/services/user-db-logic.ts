import * as Types from '../types/typeindex';

export interface UserDbInterface {
	readAllSayings(): Types.SayingEssential[];
	createSaying(saying: Types.SayingEssential): Types.SayingEssential[];
	updateSaying(saying: Types.SayingEssential): Types.SayingEssential[];
	deleteSaying(saying: Types.SayingEssential): Types.SayingEssential[];
}
export class UserDbLogic implements UserDbInterface {
	private dbMethods: Types.DbMethods;

	constructor(dbMethods: Types.DbMethods) {
		this.dbMethods = dbMethods;
	}

	public readAllSayings() {
		return this.dbMethods.getAll();
	}

	public createSaying(saying: Types.SayingEssential) {
		this.dbMethods.addOne(saying);
		return this.dbMethods.getAll();
	}

	public updateSaying(saying: Types.SayingEssential) {
		this.dbMethods.modifyOne(saying);
		return this.dbMethods.getAll();
	}
	public deleteSaying(saying: Types.SayingEssential) {
		this.dbMethods.deleteById(saying._id);
		return this.dbMethods.getAll();
	}
}
