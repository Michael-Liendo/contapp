import type { IUser } from '@contapp/shared';
import Repository from '../repository';

export default class Users {
	static async getByID(userID: string): Promise<IUser | undefined> {
		const user = await Repository.users.getUserByID(userID);

		return user;
	}
}
