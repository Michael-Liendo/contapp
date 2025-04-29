import { EnvConfig } from '@/config/env';
import storage from '@/config/storage';

const Fetch = () => {
	return async (url: string, options?: RequestInit) => {
		const defaultOptions: { Authorization?: string } = {};
		const { value: token } = await storage.load({ key: 'token' });
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
