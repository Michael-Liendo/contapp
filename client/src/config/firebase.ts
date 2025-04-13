import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyBCPxesieFu7EYfiYPMtCIWe6Fm8X6SgXA',
	authDomain: 'project-for-create-app.firebaseapp.com',
	projectId: 'project-for-create-app',
	storageBucket: 'project-for-create-app.firebasestorage.app',
	messagingSenderId: '236430944478',
	appId: '1:236430944478:web:4de932ed1acdcfeaa7ba4f',
	measurementId: 'G-J9KZ9YZG8T',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
