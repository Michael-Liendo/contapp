import type { IUser } from '@contapp/shared';
import { createContext, useEffect, useState } from 'react';
import Services from '../services';
import { useQuery, useQueryClient } from 'react-query';

export interface AuthContextProps {
	isLoading: boolean;
	setUser: (user: IUser) => void;
	setToken: (token: string) => void;
	logout: () => void;
	user: IUser | undefined;
	token: string | undefined;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
	undefined,
);

export const AuthProvider = ({ children }: { children?: React.ReactNode }) => {
	const queryClient = useQueryClient();

	const [loading, setLoading] = useState(true);
	const [token, setToken] = useState<string | undefined>(
		localStorage.getItem('token') ?? undefined,
	);

	const { user, isLoading } = useQuery(['user'], async () => {
		const user = await Services.users.me();
		return user;
	});

	const checkUser = async () => {
		setLoading(true);
		try {
			if (token) {
				const user = await Services.users.me();
				setUser(user);
			}
		} catch (e) {
			console.error(e);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		queryClient.invalidateQueries('accounts-plan');
	}, [token]);

	const updateUser = async (user: IUser) => {
		await localStorage.set('user', JSON.stringify(user));
		setUser(user);
	};

	const updateToken = async (token: string) => {
		localStorage.setItem('token', token);
		setToken(token);
	};

	const logout = async () => {
		localStorage.removeItem('token');
		setUser(undefined);
		setToken(undefined);
	};

	return (
		<AuthContext.Provider
			value={{
				isLoading: loading,
				user,
				token: token ?? undefined,
				setToken: updateToken,
				setUser: updateUser,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
