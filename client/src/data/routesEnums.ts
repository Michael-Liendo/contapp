export enum PublicRoutesEnum {}

export enum AuthRoutesEnum {
	Login = '/login',
	Signup = '/signup',
	Welcome = '/',
}

export enum PrivateRoutesEnum {
	Home = '/',
	AccountsPlan = '/accounts-plan',
	ManageCompanies = '/manage-companies',
	JournalsCreate = '/journals/create',
	JournalsHistory = '/journals/history',
	JournalsView = '/journals/view/:journal_id',
	Profile = '/profile',
}
