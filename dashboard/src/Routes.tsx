import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch,
} from 'react-router-dom';

import { LApp, LAuth } from './components/layout';
import { AuthRoutesEnum, PrivateRoutesEnum } from './data/routesEnums';
import useAuth from './hooks/useAuth';
import AccountsPlan from './pages/(app)/AccountsPlan';
import Home from './pages/(app)/Home';
import Profile from './pages/(app)/Profile';
import Login from './pages/(auth)/Login';
import Signup from './pages/(auth)/Signup';

import type { JSX } from 'react';

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
		return <div>Loading...</div>;
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
		key={PrivateRoutesEnum.AccountsPlan}
		path={PrivateRoutesEnum.AccountsPlan}
		component={AccountsPlan}
		exact
	/>,
	<Route
		key={PrivateRoutesEnum.Profile}
		path={PrivateRoutesEnum.Profile}
		component={Profile}
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
