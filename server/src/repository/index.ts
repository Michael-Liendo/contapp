import { Company } from './company';
import { User } from './user';
import { AccountPlan } from './accounts-plan';

export default class Repository {
	static user = User;
	static company = Company;
	static accountPlan = AccountPlan;
}
