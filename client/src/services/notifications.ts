import { Capacitor } from '@capacitor/core';
import { getApps } from 'firebase/app';

import { restartApp } from '@/config/firebase';
import fetch from '@/utils/fetch';
import { PushNotifications } from '@capacitor/push-notifications';
import {
	APP_NAME_CAPITALIZED,
	APP_NAME_LOWER,
	type ISResponse,
	type IUserDevice,
} from '@contapp/shared';
import Services from '.';

export class NotificationsService {
	static async start(user_id: string) {
		try {
			if (!Capacitor.isNativePlatform()) return;
			const apps = getApps();
			if (apps.length === 0) {
				restartApp();
			}
			if (Capacitor.getPlatform() === 'android') {
				await NotificationsService.createChannel();
			}

			PushNotifications.addListener('registration', async (token) => {
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
					Services.firebase.logEvent('campaign_opened', {
						campaign_id: payload.notification.id,
					});

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
			id: `${APP_NAME_LOWER}-channel`,
			name: `${APP_NAME_CAPITALIZED} Channel`,
			description: `${APP_NAME_CAPITALIZED} Channel`,
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
		const response = await fetch('/notification/device-token', {
			// todo: define if create or update
			method: 'POST',
			body: JSON.stringify({ user_id, device_token }),
		});

		const notification: ISResponse<IUserDevice> = await response.json();
		return notification;
	}
}
