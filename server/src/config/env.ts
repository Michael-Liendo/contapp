import * as dotenv from 'dotenv';
dotenv.config();

const {
	NODE_ENV = 'development',
	PORT = 3000,
	SALT_ROUNDS = 10,
	CORS_ORIGIN = 'http://localhost:3000,http://localhost:3001,http://localhost:5173,http://localhost,capacitor://localhost',
	JWT_PRIVATE_KEY = 'contapp',
	POSTGRES_HOST = '0.0.0.0',
	POSTGRES_PASSWORD = 'password',
	POSTGRES_USER = 'user',
	POSTGRES_DB = 'server-app',
	HOST = '127.0.0.1',
	GOOGLE_WEB_CLIENT_ID = '236430944478-v1nsr5mai4ertrhfcmbuemofndg8i5j9.apps.googleusercontent.com',
	STRIPE_SECRET_KEY = '',
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
			GOOGLE_WEB_CLIENT_ID,
			STRIPE_SECRET_KEY,
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
		GOOGLE_WEB_CLIENT_ID,
		STRIPE_SECRET_KEY,
	};
};
