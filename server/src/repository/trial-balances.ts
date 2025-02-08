import database from './database';

import type { ITrialBalance, ITrialBalanceRequest } from '@contapp/shared';

export class TrialBalances {
	/**
	 * Get the trial balance for a given company and period.
	 * @param params - Object containing company ID, start date, and end date.
	 * @returns A list of accounts with their respective balances.
	 */
	static async getTrialBalance(
		params: ITrialBalanceRequest,
	): Promise<ITrialBalance[]> {
		const { company_id, start_date, end_date } = params;

		// Query to get accounts with balance or movements in the period
		const result = await database<ITrialBalance>('accounts_plan as a')
			.leftJoin('journal_entries as je', 'a.id', 'je.account_id')
			.leftJoin('journals as j', 'je.journal_id', 'j.id')
			.where('a.company_id', company_id)
			.whereRaw('(j.entry_date BETWEEN ? AND ? OR je.account_id IS NOT NULL)', [
				start_date,
				end_date,
			])
			.groupBy('a.id', 'a.nomenclature', 'a.name')
			.select([
				'a.id as account_id',
				'a.nomenclature',
				'a.name as account_name',
				database.raw(
					'COALESCE(SUM(CASE WHEN j.entry_date < ? THEN je.debit - je.credit ELSE 0 END), 0) as initial_balance',
					[start_date],
				),
				database.raw(
					'COALESCE(SUM(CASE WHEN j.entry_date BETWEEN ? AND ? THEN je.debit ELSE 0 END), 0) as debits',
					[start_date, end_date],
				),
				database.raw(
					'COALESCE(SUM(CASE WHEN j.entry_date BETWEEN ? AND ? THEN je.credit ELSE 0 END), 0) as credits',
					[start_date, end_date],
				),
			]);

		// Calculate final balance
		return result.map((account) => ({
			...account,
			final_balance:
				Number(account.initial_balance) +
				Number(account.debits) -
				Number(account.credits),
		}));
	}
}
