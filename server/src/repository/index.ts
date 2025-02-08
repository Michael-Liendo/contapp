import { AccountsPlan } from './accounts-plan';
import { Companies } from './companies';
import { Journals } from './journals';
import { JournalEntries } from './journals-entries';
import { TrialBalances } from './trial-balances';
import { Users } from './user';

export default class Repository {
	static users = Users;
	static companies = Companies;
	static accountsPlan = AccountsPlan;
	static journals = Journals;
	static journalEntries = JournalEntries;
	static trialBalance = TrialBalances;
}
