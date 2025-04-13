import { analytics } from '@/config/firebase';
import { type AnalyticsCallOptions, logEvent } from 'firebase/analytics';
import { getAuth as fbGetAuth, signInWithCustomToken } from 'firebase/auth';

export class FirebaseService {
	static async signInWithCustomToken(fbToken: string) {
		const auth = FirebaseService.getAuth();
		await signInWithCustomToken(auth, fbToken);
	}
	static getAuth() {
		const auth = fbGetAuth();
		return auth;
	}
	static async logEvent(
		eventName: string,
		params: Record<string, string>,
		options?: AnalyticsCallOptions,
	) {
		logEvent(analytics, eventName, params, options);
	}
}
