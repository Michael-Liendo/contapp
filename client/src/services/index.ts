import AccountPlanService from './account-plan';
import Auth from './auth';
import Company from './company';
import Default from './default';
import User from './user';

export default class Services {
	static default = Default;
	static auth = Auth;
	static user = User;
	static company = Company;
	static accountPlan = AccountPlanService;
}
