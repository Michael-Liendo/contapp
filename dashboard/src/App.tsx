import { QueryClient, QueryClientProvider } from 'react-query';

import { Routes } from './Routes';
import { Toaster } from './components/ui/toaster';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

const queryClient = new QueryClient();

function App() {
	return (
		<>
			<ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
				<QueryClientProvider client={queryClient}>
					<AuthProvider>
						<Routes />
					</AuthProvider>
				</QueryClientProvider>
			</ThemeProvider>
			<Toaster />
		</>
	);
}

export default App;
