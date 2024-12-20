import fetch from '@/utils/fetch';

export default class Default {
	static async delete(masterName: string, id: string) {
		try {
			const request = await fetch(`/${masterName}/delete/${id}`, {
				method: 'DELETE',
			});

			const response = await request.json();

			return response;
		} catch (error) {
			console.error('DefaultServices', error);
			throw error;
		}
	}
}
