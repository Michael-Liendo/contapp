import fetch from '@/utils/fetch';
import { TrialBalanceSchema, type ITrialBalanceRequest } from '@contapp/shared';

export default class Reports {
	static async trialBalance(query: ITrialBalanceRequest) {
		try {
			const request = await fetch(
				`/reports/trial-balance?company_id=${query.company_id}&start_date=${query.start_date}&end_date=${query.end_date}`,
			);

			const response = await request.json();

			return TrialBalanceSchema.array().parse(response?.data);
		} catch (error) {
			console.error('ReportsServices', error);
			throw error;
		}
	}
}
