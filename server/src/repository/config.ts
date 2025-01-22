import type { Knex } from 'knex';

const knexConfig: { [key: string]: Knex.Config } = {
	development: {
		client: 'pg',
		connection: {
			host: process.env.POSTGRES_HOST,
			user: process.env.POSTGRES_USER,
			password: process.env.POSTGRES_PASSWORD,
			database: process.env.POSTGRES_DB,
		},
		pool: { min: 0, max: 10 },
	},
	production: {
		client: 'pg',
		connection: {
			host: process.env.POSTGRES_HOST,
			user: process.env.POSTGRES_USER,
			password: process.env.POSTGRES_PASSWORD,
			database: process.env.POSTGRES_DB,
			ssl: {
				rejectUnauthorized: false,
			},
		},
		pool: { min: 0, max: 10 },
	},
};

export default knexConfig[process.env.NODE_ENV || 'development'];
