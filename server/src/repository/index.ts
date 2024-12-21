import { AccountPlan } from './accounts-plan';
import { Company } from './company';
import { User } from './user';

export default class Repository {
	static user = User;
	static company = Company;
	static accountPlan = AccountPlan;
}
