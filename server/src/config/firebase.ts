import { credential } from 'firebase-admin';
import type { AppOptions } from 'firebase-admin/app';
import * as firebaseAdmin from 'firebase-admin';
import { EnvConfig } from './env';

const credentials = credential.cert({
	projectId: 'project-for-create-app',
	privateKey: EnvConfig().FIREBASE_PRIVATE_KEY,
	clientEmail: EnvConfig().FIREBASE_CLIENT_EMAIL,
});

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig: AppOptions = {
	projectId: 'project-for-create-app',
	storageBucket: 'project-for-create-app.firebasestorage.app',
	credential: credentials,
};

firebaseAdmin.initializeApp(firebaseConfig);

// Initialize Firebase
export const app = firebaseAdmin;
