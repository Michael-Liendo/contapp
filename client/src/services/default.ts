import fetch from '@/utils/fetch';

export default class Default {
	static async delete(masterName: string, id: string) {
		try {
			const request = await fetch(`/${masterName}/delete/${id}`, {
				method: 'DELETE',
			});

			if (request.status === 204) {
				return null;
			}
		} catch (error) {
			console.error('DefaultServices', error);
			throw error;
		}
	}
}
