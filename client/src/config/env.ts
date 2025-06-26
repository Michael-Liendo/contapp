const {
	VITE_API_URL = 'http://127.0.0.1:3000',
	NODE_ENV = 'development',
	VITE_GOOGLE_WEB_CLIENT_ID = '949333678429-oe1rf6vjba58iukt1g2ckcipdjas0nd8.apps.googleusercontent.com',
} = import.meta.env;

export const EnvConfig = () => {
	if (NODE_ENV === 'production') {
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
