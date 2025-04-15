import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';

import { IonRouterOutlet } from '@ionic/react';
import AppLayout from './components/app-layout';
import { CompanyProvider } from './context/CompanyContext';
import { AuthRoutesEnum, PrivateRoutesEnum } from './data/routesEnums';
import useAuth from './hooks/useAuth';
import AccountsPlan from './pages/(app)/AccountsPlan';
import Home from './pages/(app)/Home';
import ManageCompanies from './pages/(app)/ManageCompanies';
import Profile from './pages/(app)/Profile';
import JournalsCreate from './pages/(app)/journals/Create';
import JournalsHistory from './pages/(app)/journals/History';
import JournalsView from './pages/(app)/journals/View';
import TrialBalance from './pages/(app)/reports/TrialBalance';
import Login from './pages/(auth)/Login';
import Signup from './pages/(auth)/Signup';

import type { JSX } from 'react';

const PrivateRoutesWrapper = ({ children }: { children: React.ReactNode }) => {
	const { token } = useAuth();

	return token ? (
		<CompanyProvider>
			<AppLayout>{children}</AppLayout>
		</CompanyProvider>
	) : (
		<Redirect to={AuthRoutesEnum.Login} />
	);
};

const AuthRoutesWrapper = ({ children }: { children: React.ReactNode }) => {
	const { token } = useAuth();

	return !token ? children : <Redirect to={PrivateRoutesEnum.Home} />;
};

export function Routes() {
	const { isLoading } = useAuth();

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<IonReactRouter>
			<IonRouterOutlet id='main'>
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
			</IonRouterOutlet>
		</IonReactRouter>
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
		key={PrivateRoutesEnum.ManageCompanies}
		path={PrivateRoutesEnum.ManageCompanies}
		component={ManageCompanies}
		exact
	/>,
	<Route
		key={PrivateRoutesEnum.JournalsCreate}
		path={PrivateRoutesEnum.JournalsCreate}
		component={JournalsCreate}
		exact
	/>,
	<Route
		key={PrivateRoutesEnum.JournalsHistory}
		path={PrivateRoutesEnum.JournalsHistory}
		component={JournalsHistory}
		exact
	/>,
	<Route
		key={PrivateRoutesEnum.JournalsView}
		path={PrivateRoutesEnum.JournalsView}
		component={JournalsView}
		exact
	/>,
	<Route
		key={PrivateRoutesEnum.ReportsTrialBalance}
		path={PrivateRoutesEnum.ReportsTrialBalance}
		component={TrialBalance}
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
	<Route key={'no-found'} component={() => <>No Found</>} exact />,
];
