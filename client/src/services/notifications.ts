import { Capacitor } from '@capacitor/core';
import { getApps } from 'firebase/app';

import { PushNotifications } from '@capacitor/push-notifications';
import fetch from '@/utils/fetch';

export class NotificationsService {
	static async start(user_id: string) {
		try {
			if (!Capacitor.isNativePlatform()) return;
			const apps = getApps();
			if (apps.length === 0) {
				// Services.firebase.restartApp();
				// todo: restart app
			}
			if (Capacitor.getPlatform() === 'android') {
				await NotificationsService.createChannel();
			}

			PushNotifications.addListener('registration', async (token) => {
				console.log(
					'🚀 ~ NotificationService ~ PushNotifications.addListener ~ token:',
					token,
				);
				await NotificationsService.deviceToken(user_id, token.value);
			});

			PushNotifications.addListener('registrationError', (error) => {
				console.error('Error on registration: ', error);
			});

			PushNotifications.addListener(
				'pushNotificationReceived',
				(notification) => {
					console.log('pushNotificationReceived: ', notification);
				},
			);

			await NotificationsService.register();
		} catch (e) {
			console.error(e);
		}
	}

	static async createChannel() {
		const existingChannels = await PushNotifications.listChannels();
		if (
			existingChannels.channels.find(
				(channel) =>
					channel.id === 'contapp-channel' ||
					channel.id === 'petch-emergency-channel',
			)
		) {
			return;
		}

		await PushNotifications.createChannel({
			id: 'contapp-channel',
			name: 'Contapp Channel',
			description: 'Contapp Channel',
			importance: 1,
			visibility: 0,
		});
	}

	static async register() {
		let permStatus = await PushNotifications.checkPermissions();

		if (permStatus.receive === 'prompt') {
			permStatus = await PushNotifications.requestPermissions();
		}

		if (permStatus.receive !== 'granted') {
			throw new Error('User denied permissions!');
		}

		await PushNotifications.register();
	}

	static async deviceToken(id: string, device_token: string) {
		try {
			const response = await fetch('/notification/device-token', {
				// todo: define if create or update
				method: 'POST',
				body: JSON.stringify({ id, device_token }),
			});

			const notification = await response.json();
			return notification;
		} catch (error) {
			console.log('error', error);
		}
	}
}
