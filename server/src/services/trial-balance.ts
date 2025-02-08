import type { ITrialBalance, ITrialBalanceRequest } from '@contapp/shared';
import Repository from '../repository';

export class TrialBalanceService {
	/**
	 * Get the trial balance for a given company and period.
	 * @param params - Object containing company ID, start date, and end date.
	 * @returns A list of accounts with their respective balances.
	 */
	static async getTrialBalance(
		params: ITrialBalanceRequest,
	): Promise<ITrialBalance[]> {
		const trialBalance = await Repository.trialBalance.getTrialBalance(params);

		return trialBalance;
	}
}
