import { createContext, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import Services from '../services';

import AsyncStorage from '@react-native-async-storage/async-storage';

export interface AuthContextProps {
	isLoading: boolean;
	setToken: (token: string) => void;
	logout: () => void;
	user: any | undefined;
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
	} = useQuery(['user', token], async () => {
		const token = await AsyncStorage.getItem('token');
		setToken(token ?? undefined);
		if (!token) return;
		const user = await Services.users.me();

		return user;
	});

	useEffect(() => {
		refetch();
	}, [token]);

	const updateToken = async (token: string) => {
		setToken(token);
		await AsyncStorage.setItem('token', token);
		refetch();
	};

	const logout = async () => {
		await AsyncStorage.removeItem('token');
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
