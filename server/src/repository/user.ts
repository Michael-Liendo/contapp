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
		const user = await users.where({ email }).first();
		return user;
	}

	/**
	 *  getUserByID - get a user with the ID
	 * @param id string
	 * @returns string IUser
	 */
	static async getUserByID(id: string): Promise<IUser | undefined> {
		const user = await users.where({ id }).first();

		return user;
	}

	/**
	 *  createUser - creates a user and returns the id
	 * @param user IUserForRegister
	 * @returns string id
	 */
	static async createUser(user: IUserForRegister): Promise<string> {
		const id = await users.insert(user).returning('id').first();
		if (!id) throw new InternalServerError('Error creating user');
		return id.id;
	}
}
