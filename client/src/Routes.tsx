import {
	Routes as ReactRoutes,
	Route,
	BrowserRouter as Router,
} from 'react-router-dom';
import { Navigate, Outlet } from 'react-router-dom';

import AppLayout from './components/app-layout';
import { CompanyProvider } from './context/CompanyContext';
import { AuthRoutesEnum, PrivateRoutesEnum } from './data/routesEnums';
import useAuth from './hooks/useAuth';
import AccountsPlan from './pages/(app)/AccountsPlan';
import Home from './pages/(app)/Home';
import JournalsCreate from './pages/(app)/Journals/Create';
import JournalsHistory from './pages/(app)/Journals/History';
import JournalsView from './pages/(app)/Journals/View';
import ManageCompanies from './pages/(app)/ManageCompanies';
import Profile from './pages/(app)/Profile';
import Login from './pages/(auth)/Login';
import Signup from './pages/(auth)/Signup';

const PrivateRoutesWrapper = () => {
	const { token } = useAuth();
	return token ? (
		<CompanyProvider>
			<AppLayout>
				<Outlet />
			</AppLayout>
		</CompanyProvider>
	) : (
		<Navigate to={AuthRoutesEnum.Login} />
	);
};

const AuthRoutesWrapper = () => {
	const { token } = useAuth();
	return !token ? <Outlet /> : <Navigate to={PrivateRoutesEnum.Home} />;
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
		Component={Home}
	/>,
	<Route
		key={PrivateRoutesEnum.AccountsPlan}
		path={PrivateRoutesEnum.AccountsPlan}
		Component={AccountsPlan}
	/>,
	<Route
		key={PrivateRoutesEnum.ManageCompanies}
		path={PrivateRoutesEnum.ManageCompanies}
		Component={ManageCompanies}
	/>,
	<Route
		key={PrivateRoutesEnum.JournalsCreate}
		path={PrivateRoutesEnum.JournalsCreate}
		Component={JournalsCreate}
	/>,
	<Route
		key={PrivateRoutesEnum.JournalsHistory}
		path={PrivateRoutesEnum.JournalsHistory}
		Component={JournalsHistory}
	/>,
	<Route
		key={PrivateRoutesEnum.JournalsView}
		path={PrivateRoutesEnum.JournalsView}
		Component={JournalsView}
	/>,
	<Route
		key={PrivateRoutesEnum.Profile}
		path={PrivateRoutesEnum.Profile}
		Component={Profile}
	/>,
];

const AuthRoutes: JSX.Element[] = [
	<Route
		key={AuthRoutesEnum.Signup}
		path={AuthRoutesEnum.Signup}
		Component={Signup}
	/>,
	<Route
		key={AuthRoutesEnum.Login}
		path={AuthRoutesEnum.Login}
		Component={Login}
	/>,
];

const PublicRoutes: JSX.Element[] = [
	<Route key={'no-found'} path={'*'} Component={() => <>No Found</>} />,
];
