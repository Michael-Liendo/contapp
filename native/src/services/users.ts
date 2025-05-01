import fetch from '@/utils/fetch';

export default class Users {
	static async me() {
		try {
			const request = await fetch('/users/me');
			if (request.status === 401) {
				throw new Error('Unauthorized');
			}

			const response = await request.json();

			return response.data;
		} catch (error) {
			console.error('UserServices', error);
			throw error;
		}
	}

	static async update(user: unknown) {
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
