const {
	VITE_API_URL = 'https://contapp-server.michaelliendo.com',
	NODE_ENV = 'development',
	VITE_GOOGLE_WEB_CLIENT_ID = '439889122332-7vreo40ns2b0d6g34sti11ogsatp1v57.apps.googleusercontent.com',
} = {};

export const EnvConfig = () => {
	if (NODE_ENV === 'development') {
		return {
			apiUrl: VITE_API_URL,
			googleWebClientId: VITE_GOOGLE_WEB_CLIENT_ID,
		};
	}

	return {
		apiUrl: VITE_API_URL,
		googleWebClientId: VITE_GOOGLE_WEB_CLIENT_ID,
	};
};
