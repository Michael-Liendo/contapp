import { type IUserDevice, UserDeviceSchema } from '@contapp/shared';
import database from './database';
import { InternalServerError } from '../utils/errorHandler';

export class NotificationRepository {
	static async createUserDevice(user_id: string, device_token: string) {
		const [user_device] = await database<IUserDevice>('user_devices')
			.insert({
				user_id,
				device_token,
			})
			.returning('*');

		if (!user_device) throw new InternalServerError('Error creating journal');

		return UserDeviceSchema.parse(user_device);
	}

	static async getUserDeviceByToken(device_token: string) {
		const user_device = await database<IUserDevice>('user_devices')
			.where({ device_token })
			.first();

		return user_device;
	}
}
