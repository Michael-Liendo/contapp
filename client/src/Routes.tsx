import { Route, Redirect } from 'react-router-dom';
import { IonReactRouter } from '@ionic/react-router';
import { App } from '@capacitor/app';

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
import { useCallback, useEffect } from 'react';
import { IonRouterOutlet, useIonRouter } from '@ionic/react';

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

	const ionRouter = useIonRouter();

	/* const handleGoBack = useCallback(async () => {
		if (document) {
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			document.addEventListener('ionBackButton', (ev: any) => {
				ev.detail.register(-1, () => {
					if (!ionRouter.canGoBack()) {
						App.exitApp();
					} else {
						ionRouter.goBack();
					}
				});
			});
		}
	}, []);

	useEffect(() => {
		handleGoBack();
	}, []); */

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
	/>,
	<Route
		key={PrivateRoutesEnum.AccountsPlan}
		path={PrivateRoutesEnum.AccountsPlan}
		component={AccountsPlan}
	/>,
	<Route
		key={PrivateRoutesEnum.ManageCompanies}
		path={PrivateRoutesEnum.ManageCompanies}
		component={ManageCompanies}
	/>,
	<Route
		key={PrivateRoutesEnum.JournalsCreate}
		path={PrivateRoutesEnum.JournalsCreate}
		component={JournalsCreate}
	/>,
	<Route
		key={PrivateRoutesEnum.JournalsHistory}
		path={PrivateRoutesEnum.JournalsHistory}
		component={JournalsHistory}
	/>,
	<Route
		key={PrivateRoutesEnum.JournalsView}
		path={PrivateRoutesEnum.JournalsView}
		component={JournalsView}
	/>,
	<Route
		key={PrivateRoutesEnum.ReportsTrialBalance}
		path={PrivateRoutesEnum.ReportsTrialBalance}
		component={TrialBalance}
	/>,
	<Route
		key={PrivateRoutesEnum.Profile}
		path={PrivateRoutesEnum.Profile}
		component={Profile}
	/>,
];

const AuthRoutes: JSX.Element[] = [
	<Route
		key={AuthRoutesEnum.Signup}
		path={AuthRoutesEnum.Signup}
		component={Signup}
	/>,
	<Route
		key={AuthRoutesEnum.Login}
		path={AuthRoutesEnum.Login}
		component={Login}
	/>,
];

const PublicRoutes: JSX.Element[] = [
	<Route key={'no-found'} component={() => <>No Found</>} exact />,
];
