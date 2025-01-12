import type { IUser } from '@contapp/shared';
import Repository from '../repository';

export default class Users {
	static async getByID(userID: string): Promise<IUser | undefined> {
		const user = await Repository.users.getUserByID(userID);

		return user;
	}

	static async updateUser(
		id: string,
		userUpdates: Partial<IUser>,
	): Promise<boolean> {
		return Repository.users.updateUser(id, userUpdates);
	}
}
