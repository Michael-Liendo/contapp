export enum PublicRoutesEnum {
	Home = '/',
}

export enum AuthRoutesEnum {
	Login = '/login',
	Signup = '/signup',
}

export enum PrivateRoutesEnum {
	Home = '/home',
	AccountsPlan = '/accounts-plan',
	ManageCompanies = '/manage-companies',
	JournalsCreate = '/journals/create',
	JournalsHistory = '/journals/history',
	JournalsView = '/journals/history/:journal_id',
	ReportsTrialBalance = '/reports/trial-balance',
	Profile = '/profile',
}
