import Services from '.';
import Repository from '../repository';

export class NotificationsService {
	static async createDeviceToken(user_id: string, device_token: string) {
		const user = await Repository.users.getUserByID(user_id);

		if (!user) {
			throw new Error('User not found');
		}
		await Repository.notifications.create(user_id, device_token);

		await Services.firebase.suscribeToTopic(device_token);
		await Services.firebase.subscribeRoleTopic(device_token, user.role);
	}
}
