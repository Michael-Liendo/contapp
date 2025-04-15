import { Capacitor } from '@capacitor/core';
import { IonApp, setupIonicReact } from '@ionic/react';
import { useCallback, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { Routes } from './Routes';
import { Toaster } from './components/ui/toaster';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Services from './services';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

const queryClient = new QueryClient();

setupIonicReact();

function App() {
	const createChannelNotifications = useCallback(async () => {
		await Services.notifications.createChannel();
		await Services.notifications.register();
	}, []);

	useEffect(() => {
		if (Capacitor.getPlatform() === 'android') {
			createChannelNotifications();
		}
	}, []);

	return (
		<>
			<IonApp>
				<ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
					<QueryClientProvider client={queryClient}>
						<AuthProvider>
							<Routes />
						</AuthProvider>
					</QueryClientProvider>
				</ThemeProvider>
				<Toaster />
			</IonApp>
		</>
	);
}

export default App;
