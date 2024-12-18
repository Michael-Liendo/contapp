import { Routes } from './Routes';
import { Toaster } from './components/ui/toaster';
import { AuthProvider } from './context/AuthContext';
import { CompanyProvider } from './context/CompanyContext';
import { ThemeProvider } from './context/ThemeContext';

function App() {
	return (
		<>
			<ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
				<AuthProvider>
					<CompanyProvider>
						<Routes />
					</CompanyProvider>
				</AuthProvider>
			</ThemeProvider>
			<Toaster />
		</>
	);
}

export default App;
