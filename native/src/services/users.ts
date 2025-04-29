import { type IUserForUpdate, UserSchema } from '@contapp/shared';
import fetch from '@/utils/fetch';
import storage from '@/config/storage';

export default class Users {
	static async me() {
		try {
			const request = await fetch('/users/me');
			if (request.status === 401) {
				await storage.remove({ key: 'token' });
				throw new Error('Unauthorized');
			}

			const response = await request.json();

			return UserSchema.parse(response.data);
		} catch (error) {
			console.error('UserServices', error);
			throw error;
		}
	}

	static async update(user: IUserForUpdate) {
		try {
			const request = await fetch('/users/update', {
				method: 'PUT',
				body: JSON.stringify(user),
			});

			if (request.status === 400) {
				throw new Error('Bad Request');
			}

			const response = await request.json();

			return response.success as boolean;
		} catch (error) {
			console.error('userServices', error);
			throw error;
		}
	}
}
