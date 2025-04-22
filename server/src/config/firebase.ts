import { credential } from 'firebase-admin';
import * as firebaseAdmin from 'firebase-admin';
import type { AppOptions } from 'firebase-admin/app';
import json from '../../firebase-service-account.json';

const credentials = credential.cert(json as firebaseAdmin.ServiceAccount);

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig: AppOptions = {
	projectId: 'contiapp-production-ve',
	storageBucket: 'contiapp-production-ve.firebasestorage.app',
	credential: credentials,
};

firebaseAdmin.initializeApp(firebaseConfig);

// Initialize Firebase
export const app = firebaseAdmin;
