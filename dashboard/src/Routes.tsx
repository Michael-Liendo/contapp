import {
	Redirect,
	Route,
	BrowserRouter as Router,
	Switch,
} from 'react-router-dom';

import { LApp, LAuth } from './components/layout';
import { AuthRoutesEnum, PrivateRoutesEnum } from './data/routesEnums';
import useAuth from './hooks/useAuth';
import Home from './pages/(app)/Home';
import Login from './pages/(auth)/Login';
import Signup from './pages/(auth)/Signup';

import type { JSX } from 'react';
import { LoadingFullScreen } from './components/loading';
import UserDevices from './pages/(app)/UserDevices';
import Users from './pages/(app)/Users';

const PrivateRoutesWrapper = ({ children }: { children: React.ReactNode }) => {
	const { token } = useAuth();

	return token ? (
		<LApp>{children}</LApp>
	) : (
		<Redirect to={AuthRoutesEnum.Login} />
	);
};

const AuthRoutesWrapper = ({ children }: { children: React.ReactNode }) => {
	const { token } = useAuth();

	return !token ? (
		<LAuth>{children}</LAuth>
	) : (
		<Redirect to={PrivateRoutesEnum.Home} />
	);
};

export function Routes() {
	const { isLoading } = useAuth();

	if (isLoading) {
		return <LoadingFullScreen />;
	}

	return (
		<Router>
			<Switch>
				{PrivateRoutes.map((route) => (
					<Route key={route.props.path} path={route.props.path} exact>
						<PrivateRoutesWrapper>{route}</PrivateRoutesWrapper>
					</Route>
				))}

				{AuthRoutes.map((route) => (
					<Route key={route.props.path} path={route.props.path} exact>
						<AuthRoutesWrapper>{route}</AuthRoutesWrapper>
					</Route>
				))}

				{PublicRoutes.map((route) => route)}
			</Switch>
		</Router>
	);
}

const PrivateRoutes: JSX.Element[] = [
	<Route
		key={PrivateRoutesEnum.Home}
		path={PrivateRoutesEnum.Home}
		component={Home}
		exact
	/>,

	<Route
		key={PrivateRoutesEnum.Users}
		path={PrivateRoutesEnum.Users}
		component={Users}
		exact
	/>,
	<Route
		key={PrivateRoutesEnum.UserDevices}
		path={PrivateRoutesEnum.UserDevices}
		component={UserDevices}
		exact
	/>,
];

const AuthRoutes: JSX.Element[] = [
	<Route
		key={AuthRoutesEnum.Signup}
		path={AuthRoutesEnum.Signup}
		component={Signup}
		exact
	/>,
	<Route
		key={AuthRoutesEnum.Login}
		path={AuthRoutesEnum.Login}
		component={Login}
		exact
	/>,
];

const PublicRoutes: JSX.Element[] = [
	<Route key={'no-found'} path={'*'} component={() => <>No Found</>} exact />,
];
