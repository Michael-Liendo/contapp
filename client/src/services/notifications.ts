import { Capacitor } from '@capacitor/core';
import { getApps } from 'firebase/app';

import { restartApp } from '@/config/firebase';
import fetch from '@/utils/fetch';
import { PushNotifications } from '@capacitor/push-notifications';

export class NotificationsService {
	static async start(user_id: string) {
		try {
			if (!Capacitor.isNativePlatform())
				return console.log('NotificationsService ~ isNativePlatform: false');
			const apps = getApps();
			if (apps.length === 0) {
				restartApp();
			}
			if (Capacitor.getPlatform() === 'android') {
				await NotificationsService.createChannel();
			}

			PushNotifications.addListener('registration', async (token) => {
				console.log(
					'NotificationsService ~ PushNotifications.addListener.registration ~ token:',
					token.value,
				);
				await NotificationsService.addDeviceToken(user_id, token.value);
			});

			PushNotifications.addListener('registrationError', (error) => {
				console.error('Error on registration: ', error.error);
			});

			PushNotifications.addListener(
				'pushNotificationReceived',
				(notification) => {
					console.log('pushNotificationReceived: ', notification);
				},
			);

			PushNotifications.addListener(
				'pushNotificationActionPerformed',
				(payload) => {
					// example with deeplink
					if (payload.notification.data.deeplink) {
						window.location.href = payload.notification.data.deeplink;
					}
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
				(channel) => channel.id === 'contapp-channel',
			)
		) {
			return;
		}

		await PushNotifications.createChannel({
			id: 'contapp-channel',
			name: 'Contapp Channel',
			description: 'Contapp Channel',
			importance: 3,
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

	static async addDeviceToken(user_id: string, device_token: string) {
		try {
			const response = await fetch('/notification/device-token', {
				// todo: define if create or update
				method: 'POST',
				body: JSON.stringify({ user_id, device_token }),
			});

			const notification = await response.json();
			return notification;
		} catch (error) {
			console.log('error', error);
		}
	}
}
