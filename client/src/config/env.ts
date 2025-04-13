const {
	VITE_API_URL = 'http://127.0.0.1:3000',
	NODE_ENV = 'development',
	VITE_GOOGLE_WEB_CLIENT_ID = '236430944478-v1nsr5mai4ertrhfcmbuemofndg8i5j9.apps.googleusercontent.com',
} = import.meta.env;

export const EnvConfig = () => {
	if (NODE_ENV === 'production') {
		return {
			apiUrl: VITE_API_URL,
		};
	}

	return {
		apiUrl: VITE_API_URL,
		googleWebClientId: VITE_GOOGLE_WEB_CLIENT_ID,
	};
};
