import fetch from '../utils/fetch';

import type {
	ISignInWithProvider,
	IUserForLogin,
	IUserForRegister,
} from '@contapp/shared';

export default class Auth {
	static async register(data: IUserForRegister) {
		try {
			const request = await fetch('/auth/register', {
				method: 'POST',
				body: JSON.stringify(data),
			});

			const response = await request.json();

			return response;
		} catch (error) {
			console.error(error);
		}
	}
	static async login(data: IUserForLogin) {
		try {
			const request = await fetch('/auth/login', {
				method: 'POST',
				body: JSON.stringify(data),
			});

			const response = await request.json();

			return response.data;
		} catch (error) {
			console.error(error);
		}
	}

	static async signInWithProvider(data: ISignInWithProvider) {
		try {
			const request = await fetch('/auth/provider', {
				method: 'POST',
				body: JSON.stringify(data),
			});

			const response = await request.json();

			return response.data;
		} catch (error) {
			console.error(error);
		}
	}

	static async renewToken() {
		try {
			const request = await fetch('/auth/renew', {
				method: 'GET',
			});

			const response = await request.json();

			return response.data;
		} catch (error) {
			console.error(error);
		}
	}
}
