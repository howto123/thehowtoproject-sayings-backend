import { Client } from 'pg';
import dotenv from 'dotenv';

import * as Types from '../types/typeindex';

// Settings
dotenv.config();
const pgConfigHeroku = {
	connectionString: process.env.DATABASE_URL,
	ssl: {
		rejectUnauthorized: false,
	},
};

const pgConfigLocal = {
	user: 'postgres',
	host: 'localhost',
	port: parseInt(process.env.DB_PORT),
	database: 'sayingsdb',
	password: process.env.DB_PASSWORD,
};

export class DbMethodsPostgres implements Types.DbMethods {
	private client: Client;

	constructor() {
		// create client in function of environment
		if (process.env.MODE === 'local') this.client = new Client(pgConfigLocal);
		else this.client = new Client(pgConfigHeroku);

		this.client.connect((err) => {
			if (err) {
				console.error('connection error', err.stack);
			} else {
				console.log('connected to postgres');
			}
		});

		console.log('process.env.MODE =', process.env.MODE);
	}

	public getAll() {
		console.log('pg mehtod called', this.client);
		return [{ _id: '', saying: '', author: '', topic: '' }];
	}

	public addOne(one: Types.SayingEssential) {
		console.log('pg mehtod called', one);
	}

	public modifyOne(newOne: Types.SayingEssential) {
		console.log('pg mehtod called', newOne);
	}

	public deleteById(id: Types.Identity) {
		console.log('pg mehtod called', id);
		return { _id: '', saying: '', author: '', topic: '' };
	}
}
