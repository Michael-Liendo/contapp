import AccountsPlan from './accounts-plan';
import Auth from './auth';
import Companies from './companies';
import { FirebaseService } from './firebase';
import { Journal } from './journal';
import { NotificationsService } from './notification';
import { TrialBalanceService } from './trial-balance';
import Users from './users';

export default class Services {
	static auth = Auth;
	static user = Users;
	static company = Companies;
	static accountsPlan = AccountsPlan;
	static journals = Journal;
	static trialBalance = TrialBalanceService;
	static firebase = FirebaseService;
	static notifications = NotificationsService;
}
