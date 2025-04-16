import fetch from '../utils/fetch';

import type {
	ISResponse,
	ISignInWithProvider,
	ITokens,
	IUser,
	IUserForLogin,
	IUserForRegister,
} from '@contapp/shared';

export default class Auth {
	static async register(data: IUserForRegister) {
		const request = await fetch('/auth/register', {
			method: 'POST',
			body: JSON.stringify(data),
		});

		const response: ISResponse<{
			user: IUser;
			tokens: ITokens;
		}> = await request.json();

		if (response.success === false) throw new Error('Error registering');

		return response;
	}
	static async login(data: IUserForLogin) {
		const request = await fetch('/auth/login', {
			method: 'POST',
			body: JSON.stringify(data),
		});

		const response = await request.json();

		if (response.success === false) throw new Error('Error logging in');

		return response as ISResponse<ITokens>;
	}

	static async signInWithProvider(data: ISignInWithProvider) {
		const request = await fetch('/auth/provider', {
			method: 'POST',
			body: JSON.stringify(data),
		});

		const response = await request.json();

		if (response.success === false) throw new Error('Error logging in');

		return response as ISResponse<ITokens>;
	}

	static async renewToken() {
		const request = await fetch('/auth/renew', {
			method: 'GET',
		});

		const response = await request.json();

		return response as ISResponse<ITokens>;
	}
}
