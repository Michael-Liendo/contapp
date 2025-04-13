import { EnvConfig } from '@/config/env';

const Fetch = () => {
	return async (url: string, options?: RequestInit) => {
		const defaultOptions: { Authorization?: string } = {};
		const token = localStorage.getItem('token');
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
