import AccountsPlan from './accounts-plan';
import Admin from './admin';
import Auth from './auth';
import Companies from './companies';
import { FirebaseService } from './firebase';
import Journals from './journals';
import { NotificationsService } from './notifications';
import Reports from './reports';
import { StripeService } from './stripe';
import Users from './users';

export default class Services {
	static admin = Admin;
	static auth = Auth;
	static users = Users;
	static companies = Companies;
	static accountsPlan = AccountsPlan;
	static journals = Journals;
	static reports = Reports;
	static firebase = FirebaseService;
	static notifications = NotificationsService;
	static stripe = StripeService;
}
