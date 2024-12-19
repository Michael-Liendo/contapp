import AccountsPlan from './accounts-plan';
import Auth from './auth';
import Company from './company';
import User from './user';

export default class Services {
	static auth = Auth;
	static user = User;
	static company = Company;
	static accountPlan = AccountsPlan;
}
