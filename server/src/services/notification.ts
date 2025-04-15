import Services from '.';
import Repository from '../repository';

export class NotificationsService {
	static async createDeviceToken(user_id: string, device_token: string) {
		const user = await Repository.users.getUserByID(user_id);

		if (!user) {
			throw new Error('User not found');
		}

		let user_device =
			await Repository.notifications.getUserDeviceByToken(device_token);
		if (user_device) {
			return user_device;
		}

		user_device = await Repository.notifications.createUserDevice(
			user_id,
			device_token,
		);

		await Services.firebase.suscribeToTopic(device_token);
		await Services.firebase.subscribeRoleTopic(device_token, user.role);

		return user_device;
	}
}
