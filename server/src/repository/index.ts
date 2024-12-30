import { AccountsPlan } from './accounts-plan';
import { Companies } from './companies';
import { Users } from './user';

export default class Repository {
	static users = Users;
	static companies = Companies;
	static accountsPlan = AccountsPlan;
}
