import { app } from '../config/firebase';

export class FirebaseService {
	static async createCustomToken(id: string) {
		return await app.auth().createCustomToken(id);
	}
}
