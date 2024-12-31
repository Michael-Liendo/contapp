import { Journals } from '../repository/journals';
import AccountsPlan from './accounts-plan';
import Auth from './auth';
import Companies from './companies';
import Users from './users';

export default class Services {
	static auth = Auth;
	static user = Users;
	static company = Companies;
	static accountsPlan = AccountsPlan;
	static journals = Journals;
}
