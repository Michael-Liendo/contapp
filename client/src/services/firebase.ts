import { analytics } from '@/config/firebase';
import { type AnalyticsCallOptions, logEvent } from 'firebase/analytics';
import { getAuth as getAuthNative } from 'firebase/auth';

export class FirebaseService {
	static async getAuth() {
		const auth = getAuthNative();
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
