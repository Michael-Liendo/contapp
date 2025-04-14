import { getAuth as fbGetAuth, signInWithCustomToken } from 'firebase/auth';
import { logEvent } from 'firebase/analytics';
import { analytics } from '@/config/firebase';

import type { AnalyticsCallOptions } from 'firebase/analytics';
export class FirebaseService {
	static async signInWithCustomToken(fbToken: string) {
		const auth = FirebaseService.getAuth();
		const user = await signInWithCustomToken(auth, fbToken);
		return user;
	}
	static getAuth() {
		const auth = fbGetAuth();
		return auth;
	}

	static async signOut() {
		const auth = FirebaseService.getAuth();
		await auth.signOut();
	}

	static async logEvent(
		eventName: string,
		params: Record<string, string>,
		options?: AnalyticsCallOptions,
	) {
		logEvent(analytics, eventName, params, options);
	}
}
