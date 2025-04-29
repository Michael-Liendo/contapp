import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyBn-UAlFMo50dBTN_g2AP6kNEtKCjJPCcw',
	authDomain: 'contiapp-production-ve.firebaseapp.com',
	projectId: 'contiapp-production-ve',
	storageBucket: 'contiapp-production-ve.firebasestorage.app',
	messagingSenderId: '439889122332',
	appId: '1:439889122332:web:e891a3375b67b64f4f7bd9',
	measurementId: 'G-GTPM2M82LE',
};

// Initialize Firebase
let app = initializeApp(firebaseConfig);

export const restartApp = () => {
	app = initializeApp(firebaseConfig);
};
export const analytics = getAnalytics(app);

export { app };
