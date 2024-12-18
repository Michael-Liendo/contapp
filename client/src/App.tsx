import { Routes } from './Routes';
import { Toaster } from './components/ui/toaster';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

function App() {
	return (
		<>
			<ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
				<AuthProvider>
					<Routes />
				</AuthProvider>
			</ThemeProvider>
			<Toaster />
		</>
	);
}

export default App;
