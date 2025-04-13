import { EnvConfig } from './src/config/env';

const dotenv = require('dotenv');

dotenv.config();

const knexConfig = {
	development: {
		client: 'pg',
		connection: {
			host: EnvConfig().POSTGRES_HOST,
			user: EnvConfig().POSTGRES_USER,
			password: EnvConfig().POSTGRES_PASSWORD,
			database: EnvConfig().POSTGRES_DB,
		},
		pool: { min: 0, max: 10 },
	},
	production: {
		client: 'pg',
		connection: {
			host: EnvConfig().POSTGRES_HOST,
			user: EnvConfig().POSTGRES_USER,
			password: EnvConfig().POSTGRES_PASSWORD,
			database: EnvConfig().POSTGRES_DB,
			ssl: {
				rejectUnauthorized: false,
			},
		},
		pool: { min: 0, max: 10 },
	},
};

// @ts-ignore
module.exports = knexConfig[EnvConfig().NODE_ENV];
