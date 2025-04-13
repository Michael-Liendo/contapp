import { credential } from 'firebase-admin';
import type { AppOptions } from 'firebase-admin/app';
import * as firebaseAdmin from 'firebase-admin';

const credentials = credential.cert(
	require('../../firebase-service-account.json'),
);

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
