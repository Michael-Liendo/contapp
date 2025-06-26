import type { IUser } from '@contapp/shared';
import { app } from '../config/firebase';

type CustomUser = Partial<
	Omit<IUser, 'email' | 'password' | 'first_name' | 'last_name'>
> &
	Pick<IUser, 'email' | 'password' | 'first_name' | 'last_name'>;

export class FirebaseService {
	/**
	 *
	 * @param user { email: string, password: string, first_name: string, last_name:string }
	 * @returns Promise<UserRecord>
	 */
	static async createUser(user: CustomUser) {
		return await app.auth().createUser({
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

	static async suscribeToTopic(device_token: string, topic = 'general') {
		return await app.messaging().subscribeToTopic(device_token, topic);
	}

	static async subscribeRoleTopic(device_token: string, role: string) {
		return await app.messaging().subscribeToTopic(device_token, role);
	}
}
