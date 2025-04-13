const {
	NODE_ENV = 'development',
	PORT = 3000,
	SALT_ROUNDS = 10,
	CORS_ORIGIN = 'http://localhost:3000,http://localhost:3001,http://localhost:5173',
	JWT_PRIVATE_KEY = 'contapp',
	POSTGRES_HOST = '0.0.0.0',
	POSTGRES_PASSWORD = 'password',
	POSTGRES_USER = 'user',
	POSTGRES_DB = 'server-app',
	HOST = '127.0.0.1',
} = process.env;

export const EnvConfig = () => {
	if (NODE_ENV === 'production') {
		return {
			NODE_ENV,
			HOST,
			PORT,
			SALT_ROUNDS,
			CORS_ORIGIN,
			JWT_PRIVATE_KEY,
			POSTGRES_HOST,
			POSTGRES_PASSWORD,
			POSTGRES_USER,
			POSTGRES_DB,
		};
	}

	return {
		NODE_ENV,
		HOST,
		PORT,
		SALT_ROUNDS,
		CORS_ORIGIN,
		JWT_PRIVATE_KEY,
		POSTGRES_HOST,
		POSTGRES_PASSWORD,
		POSTGRES_USER,
		POSTGRES_DB,
	};
};
