import type { IUser } from '@contapp/shared';
import { createContext, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import Services from '../services';

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
	const [token, setToken] = useState<string | undefined>(
		localStorage.getItem('token') ?? undefined,
	);

	const {
		data: user,
		isLoading,
		refetch,
	} = useQuery(['user'], async () => {
		if (!token) return;
		const user = await Services.users.me();
		return user;
	});

	useEffect(() => {
		refetch();
	}, [token]);

	const updateToken = async (token: string) => {
		localStorage.setItem('token', token);
		setToken(token);
		refetch();
	};

	const logout = async () => {
		localStorage.removeItem('token');
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
