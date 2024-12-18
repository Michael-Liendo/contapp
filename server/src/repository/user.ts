import type { IUser, IUserForRegister } from '@contapp/shared';
import { InternalServerError } from '../utils/errorHandler';
import database from './database';

const users = database<IUser>('users');
export class User {
	/**
	 *  getUserByEmail - get a user with the email
	 * @param id string
	 * @returns string IUser
	 */
	static async getUserByEmail(email: string): Promise<IUser | undefined> {
		const [user] = await users.where({ email });
		return user;
	}

	/**
	 *  getUserByID - get a user with the ID
	 * @param id string
	 * @returns string IUser
	 */
	static async getUserByID(id: string): Promise<IUser | undefined> {
		const [user] = await users.where({ id });

		return user;
	}

	/**
	 *  createUser - creates a user and returns the id
	 * @param userDTO IUserForRegister
	 * @returns string id
	 */
	static async createUser(userDTO: IUserForRegister): Promise<string> {
		const [user] = await users.insert(userDTO).returning('id');
		if (!user) throw new InternalServerError('Error creating user');
		return user.id;
	}
}
