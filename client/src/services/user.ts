import { UserSchema } from '@contapp/shared';
import fetch from '../utils/fetch';

export default class User {
	static async me() {
		try {
			const request = await fetch('/user/me');
			if (request.status === 401) {
				localStorage.removeItem('token');
				throw new Error('Unauthorized');
			}

			const response = await request.json();

			return UserSchema.parse(response.data);
		} catch (error) {
			console.error('UserServices', error);
			throw error;
		}
	}
}
