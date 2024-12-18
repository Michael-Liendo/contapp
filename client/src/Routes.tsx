import {
	BrowserRouter as Router,
	Routes as ReactRoutes,
	Route,
} from 'react-router-dom';
import { Navigate, Outlet } from 'react-router-dom';

import useAuth from './hooks/useAuth';
import HomeApp from './pages/(app)/Home';
import Login from './pages/(auth)/Login';
import Signup from './pages/(auth)/Signup';
import { CompanyProvider } from './context/CompanyContext';

export enum PublicRoutesEnum {}

export enum AuthRoutesEnum {
	login = '/login',
	Signup = '/signup',
	Welcome = '/',
}

export enum PrivateRoutesEnum {
	Home = '/home',
}

const PrivateRoutesWrapper = () => {
	const { token } = useAuth();
	return token ? (
		<CompanyProvider>
			<Outlet />
		</CompanyProvider>
	) : (
		<Navigate to='/login' />
	);
};

const AuthRoutesWrapper = () => {
	const { token } = useAuth();
	return !token ? <Outlet /> : <Navigate to={'/home'} />;
};

export function Routes() {
	return (
		<Router>
			<ReactRoutes>
				<Route element={<PrivateRoutesWrapper />}>
					{PrivateRoutes.map((route) => route)}
				</Route>
				<Route element={<AuthRoutesWrapper />}>
					{AuthRoutes.map((route) => route)}
				</Route>
				{PublicRoutes.map((route) => route)}
			</ReactRoutes>
		</Router>
	);
}

const PrivateRoutes: JSX.Element[] = [
	<Route
		key={PrivateRoutesEnum.Home}
		path={PrivateRoutesEnum.Home}
		Component={HomeApp}
	/>,
];

const AuthRoutes: JSX.Element[] = [
	<Route
		key={AuthRoutesEnum.Signup}
		path={AuthRoutesEnum.Signup}
		Component={Signup}
	/>,
	<Route
		key={AuthRoutesEnum.login}
		path={AuthRoutesEnum.login}
		Component={Login}
	/>,
];

const PublicRoutes: JSX.Element[] = [
	<Route key={'no-found'} path={'*'} Component={() => <>No Found</>} />,
];
