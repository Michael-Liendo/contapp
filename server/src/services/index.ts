import AccountsPlan from './accounts-plan';
import Auth from './auth';
import Companies from './companies';
import { Journal } from './journal';
import { TrialBalanceService } from './trial-balance';
import Users from './users';

export default class Services {
	static auth = Auth;
	static user = Users;
	static company = Companies;
	static accountsPlan = AccountsPlan;
	static journals = Journal;
	static trialBalance = TrialBalanceService;
}
