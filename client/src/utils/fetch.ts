import { EnvConfig } from '@/config/env';
import { Preferences } from '@capacitor/preferences';

const Fetch = () => {
	return async (url: string, options?: RequestInit) => {
		const defaultOptions: { Authorization?: string } = {};
		const token = await Preferences.get({ key: 'token' });
		if (token) {
			defaultOptions.Authorization = `Bearer ${token}`;
		}
		const apiUrl = `${EnvConfig().apiUrl}/api${url}`;
		const requestOptions = {
			...options,
			headers: new Headers({
				'Content-Type': 'application/json',
				...defaultOptions,
				...options?.headers,
			}),
		};
		const response = await fetch(apiUrl, requestOptions);

		return response;
	};
};

export default Fetch();
