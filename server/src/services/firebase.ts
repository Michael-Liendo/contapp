import type { IUser } from '@contapp/shared';
import { app } from '../config/firebase';

export class FirebaseService {
	static async createUser(user: IUser) {
		return await app.auth().createUser({
			uid: user.id,
			email: user.email,
			password: user.password,
			displayName: `${user.first_name} ${user.last_name}`,
			emailVerified: false,
			disabled: false,
		});
	}

	static async getUserByEmail(email: string) {
		try {
			const user = await app.auth().getUserByEmail(email);
			return user.toJSON();
		} catch (_error) {
			return undefined;
		}
	}

	static async createCustomToken(id: string) {
		return await app.auth().createCustomToken(id, {
			rateLimitTimestamp: 0,
			rateLimitCount: 0,
		});
	}
}
