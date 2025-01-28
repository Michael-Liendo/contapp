import type { IUser, IUserForUpdate } from '@contapp/shared';
import Repository from '../repository';
import { BadRequestError } from '../utils/errorHandler';
import { comparePassword, hashPassword } from '../utils/password';

export default class Users {
	static async getByID(userID: string): Promise<IUser | undefined> {
		const user = await Repository.users.getUserByID(userID);

		return user;
	}

	static async update(
		id: string,
		userUpdates: Partial<IUserForUpdate>,
		password: string,
	): Promise<boolean> {
		if (userUpdates.password && userUpdates.old_password && password) {
			if (!(await comparePassword(userUpdates.old_password, password))) {
				throw new BadRequestError('Invalid password');
			}
			const hashedPassword = await hashPassword(userUpdates.password);
			userUpdates.password = hashedPassword;
		}
		const updated = await Repository.users.updateUser(id, userUpdates);
		return updated;
	}

	static async delete(id: string): Promise<boolean> {
		const deleted = await Repository.users.deleteUser(id);
		return deleted;
	}
}
