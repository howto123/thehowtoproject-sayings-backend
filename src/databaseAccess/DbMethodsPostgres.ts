import { Client } from 'pg';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';

import * as Types from '../imports/typeAndInterfaceIndex';

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

		// connect
		this.client.connect((err) => {
			if (err) {
				console.error('connection error', err.stack);
			} else {
				console.log('connected to postgres');
				this.createTable().then(() => console.log('create table if not exists successful'));
			}
		});
		console.log('process.env.MODE =', process.env.MODE); // will be 'local' or undefined
	}

	public async getAll() {
		const query = 'SELECT * FROM sayings';
		try {
			const result = (await this.client.query(query)).rows as Types.SayingEntity[];
			return result.map((e) => {
				return {
					_id: e._id,
					saying: e.saying,
					author: e.author,
					topic: e.topic,
				};
			});
		} catch (err) {
			console.log('error in postgresdb getAll(): ', err.message);
		}
	}

	public async addOne(one: Types.SayingEssential) {
		const now = new Date();
		const query = `INSERT INTO sayings (_id, saying, author, topic, created_date, modified_date)
            VALUES($1, $2, $3, $4, $5, $6)`;
		try {
			await this.client.query(query, [uuidv4(), one.saying, one.author, one.topic, now, now]);
		} catch (err) {
			console.log('error in postgresdb addOne(): ', err.message);
		}
	}

	public async modifyOne(newOne: Types.SayingEssential) {
		const now = new Date();
		const query = `UPDATE sayings
            SET saying = $1, author = $2, topic=$3, modified_date=$4
            WHERE _id=$5`;
		try {
			await this.client.query(query, [
				newOne.saying,
				newOne.author,
				newOne.topic,
				now,
				newOne._id,
			]);
		} catch (err) {
			console.log('error in postgresdb modifyOne(): ', err.message);
		}
	}

	public async deleteById(id: Types.Identity) {
		const query = 'DELETE FROM sayings WHERE _id = $1 RETURNING *;';
		try {
			return (await this.client.query(query, [id])).rows[0];
		} catch (err) {
			console.log('error in postgresdb modifyOne(): ', err.message);
		}
		return { _id: '', saying: '', author: '', topic: '' };
	}

	private async createTable() {
		// create table => needs to match saying entity as defined in saying.ts
		// -> is there a way to interlink these or to automate table creation?
		this.client.query(`CREATE EXTENSION IF NOT EXISTS "pgcrypto"`);
		//this.client.query(`DROP TABLE "sayings"`);
		let query = `CREATE TABLE IF NOT EXISTS "sayings" (
            "_id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            "saying" VARCHAR(200) NOT NULL,
            "author" VARCHAR(100),
            "topic" VARCHAR(100),
            "created_date" TIMESTAMP,
            "modified_date" TIMESTAMP
        );`;
		try {
			await this.client.query(query);
		} catch (err) {
			console.log('error while attempting to create if not exists table: ', err.message);
		}
	}
}
