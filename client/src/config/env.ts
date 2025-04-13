const { VITE_API_URL = 'http://127.0.0.1:3000', NODE_ENV = 'development' } =
	import.meta.env;

export const EnvConfig = () => {
	if (NODE_ENV === 'production') {
		return {
			apiUrl: VITE_API_URL,
		};
	}

	return {
		apiUrl: VITE_API_URL,
	};
};
