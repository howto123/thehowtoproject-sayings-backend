import { Client } from 'pg';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';
dotenv.config();

import * as Types from '../imports/typeAndInterfaceIndex';
import { pgConfigLocal, pgConfigHeroku } from './dbConfig';

export class DbMethodsPostgres implements Types.DbMethods {
	private static instance: DbMethodsPostgres;
	private client: Client;

	public static async getInstance(): Promise<DbMethodsPostgres> {
		// Singleton
		if (!this.instance) {
			this.instance = new DbMethodsPostgres();
		}

		// create client in function of environment
		if (process.env.MODE === 'local') {
			console.log('local config used: ', pgConfigLocal);
			this.instance.client = new Client(pgConfigLocal);
		} else {
			console.log('heroku config used: ', pgConfigHeroku);
			this.instance.client = new Client(pgConfigHeroku);
		}

		return this.instance;
	}

	public async disconnect(): Promise<void> {
		await this.client.end();
		console.log('Postgress Db disconnected');
	}

	public async connect() {
		DbMethodsPostgres.instance.client.connect(async (err: any) => {
			if (err) {
				console.error('connection error', err.stack);
			} else {
				console.log('connected to postgres');
				await DbMethodsPostgres.instance.createTable();
				console.log('create table if not exists successful');
			}
		});
		console.log('process.env.MODE =', process.env.MODE || 'not set...');
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

	public async addOne(saying: Types.SayingEssential) {
		const now = new Date();
		const query = `INSERT INTO sayings (_id, saying, author, topic, created_date, modified_date)
            VALUES($1, $2, $3, $4, $5, $6)`;
		try {
			await this.client.query(query, [
				uuidv4(),
				saying.saying,
				saying.author,
				saying.topic,
				now,
				now,
			]);
		} catch (err) {
			console.log('error in postgresdb addOne(): ', err.message);
		}
	}

	public async modifyOne(newSaying: Types.SayingEssential) {
		const now = new Date();
		const query = `UPDATE sayings
            SET saying = $1, author = $2, topic=$3, modified_date=$4
            WHERE _id=$5`;
		try {
			await this.client.query(query, [
				newSaying.saying,
				newSaying.author,
				newSaying.topic,
				now,
				newSaying._id,
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

	public async createTable() {
		// REVIEWER: the created table needs to match saying entity as defined in saying.ts
		// -> is there a way to interlink these or to automate table creation? eg c# entity framework offers that

		let query = `CREATE TABLE IF NOT EXISTS "sayings" (
            "_id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            "saying" VARCHAR(200) NOT NULL,
            "author" VARCHAR(100),
            "topic" VARCHAR(100),
            "created_date" TIMESTAMP,
            "modified_date" TIMESTAMP
        );`;
		try {
			await this.client.query(`CREATE EXTENSION IF NOT EXISTS "pgcrypto"`);
			await this.client.query(query);
		} catch (err) {
			console.log('error while attempting to create if not exists table: ', err.message);
		}
	}

	// singleton: public access via getInstance()
	private constructor() {}
}
