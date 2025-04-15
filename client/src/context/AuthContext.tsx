import { Preferences } from '@capacitor/preferences';
import { onAuthStateChanged } from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import Services from '../services';

import type { IUser } from '@contapp/shared';

export interface AuthContextProps {
	isLoading: boolean;
	setToken: (token: string) => void;
	logout: () => void;
	user: IUser | undefined;
	token: string | undefined;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
	undefined,
);

export const AuthProvider = ({ children }: { children?: React.ReactNode }) => {
	const [token, setToken] = useState<string | undefined>(undefined);

	const {
		data: user,
		isLoading,
		refetch,
	} = useQuery(['user'], async () => {
		if (!token) return;
		const user = await Services.users.me();

		let isTokenRenewing = false;

		onAuthStateChanged(Services.firebase.getAuth(), async (fbUser) => {
			if (!fbUser && !isTokenRenewing) {
				isTokenRenewing = true; // Lock the token renewal process
				try {
					const response = await Services.auth.renewToken();

					if (response?.token) {
						const credentials = await Services.firebase.signInWithCustomToken(
							response.fb_token,
						);
						if (!credentials.user) {
							console.warn('Failed to sign in with renewed token.');
							await logout();
						}
					} else {
						console.warn('Token renewal failed, no token returned.');
						await logout();
					}
				} catch (err) {
					console.error('Error during token renewal:', err);
					await logout();
				} finally {
					isTokenRenewing = false;
				}
			}
		});

		// notifications
		Services.notifications.start(user.id);

		return user;
	});

	useEffect(() => {
		console.log('useEffect', isLoading);
	}, [isLoading]);

	useEffect(() => {
		async function getToken() {
			const { value: token } = await Preferences.get({ key: 'token' });
			setToken(token ?? undefined);
		}
		getToken();
	}, []);

	useEffect(() => {
		refetch();
	}, [token]);

	const updateToken = async (token: string) => {
		await Preferences.set({ key: 'token', value: token });
		setToken(token);
		refetch();
	};

	const logout = async () => {
		await Preferences.remove({ key: 'token' });

		await Services.firebase.signOut();

		setToken(undefined);
	};

	return (
		<AuthContext.Provider
			value={{
				isLoading,
				user,
				token: token ?? undefined,
				setToken: updateToken,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
