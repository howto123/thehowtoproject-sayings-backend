import dotenv from 'dotenv';
dotenv.config();

export const pgConfigLocal = {
	user: 'postgres',
	host: 'localhost',
	port: parseInt(process.env.DB_PORT),
	database: 'sayingsdb',
	password: process.env.DB_PASSWORD,
};

export const pgConfigHeroku = {
	connectionString: process.env.DATABASE_URL,
	ssl: {
		rejectUnauthorized: false,
	},
};
