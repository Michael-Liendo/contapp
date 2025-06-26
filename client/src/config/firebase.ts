import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyA-USYFV4aY5oSZ1eqzA4_1V6Z3ziwsIXM',
	authDomain: 'surveymind-ai-development.firebaseapp.com',
	projectId: 'surveymind-ai-development',
	storageBucket: 'surveymind-ai-development.firebasestorage.app',
	messagingSenderId: '949333678429',
	appId: '1:949333678429:web:6cd94e9c6007f64caa70b4',
	measurementId: 'G-3E3PVM32SR',
};

// Initialize Firebase
let app = initializeApp(firebaseConfig);

export const restartApp = () => {
	app = initializeApp(firebaseConfig);
};
export const analytics = getAnalytics(app);

export { app };
