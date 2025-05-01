import fetch from '../utils/fetch';

export default class Auth {
	static async register(data: unknown) {
		const request = await fetch('/auth/register', {
			method: 'POST',
			body: JSON.stringify(data),
		});

		const response = await request.json();

		if (response.success === false) throw new Error('Error registering');

		return response;
	}
	static async login(data: unknown) {
		const request = await fetch('/auth/login', {
			method: 'POST',
			body: JSON.stringify(data),
		});

		const response = await request.json();

		if (response.success === false) throw new Error('Error logging in');

		return response;
	}

	static async signany(data: unknown) {
		const request = await fetch('/auth/provider', {
			method: 'POST',
			body: JSON.stringify(data),
		});

		const response = await request.json();

		if (response.success === false) throw new Error('Error logging in');

		return response;
	}

	static async renewToken() {
		const request = await fetch('/auth/renew', {
			method: 'GET',
		});

		const response = await request.json();

		return response;
	}
}
