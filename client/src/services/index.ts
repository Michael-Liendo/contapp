import AccountsPlan from './accounts-plan';
import Auth from './auth';
import Companies from './companies';
import Default from './default';
import Journals from './journals';
import Users from './users';

export default class Services {
	static default = Default;
	static auth = Auth;
	static users = Users;
	static companies = Companies;
	static accountsPlan = AccountsPlan;
	static journals = Journals;
}
