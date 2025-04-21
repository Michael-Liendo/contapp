import { APP_NATIVE_NAME } from '@contapp/shared';
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
	appId: 'com.contapp.app',
	appName: APP_NATIVE_NAME,
	webDir: 'dist',
	plugins: {
		PushNotifications: {
			presentationOptions: ['badge', 'sound', 'alert'],
		},
	},
};

export default config;
