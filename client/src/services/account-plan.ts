import fetch from '@/utils/fetch';
import { AccountPlanSchema, type IAccountPlanForCreate } from '@contapp/shared';

export default class AccountPlanService {
	static async findAll(companyId: string) {
		try {
			const request = await fetch(`/accounts-plan/findAll/${companyId}`);

			const response = await request.json();

			return AccountPlanSchema.array().parse(response?.data?.accounts_plan);
		} catch (error) {
			console.error('AccountPlanService.findAll', error);
			throw error;
		}
	}

	static async create(plan: IAccountPlanForCreate) {
		try {
			const request = await fetch('/accounts-plan/create', {
				method: 'POST',
				body: JSON.stringify(plan),
			});

			const response = await request.json();

			return AccountPlanSchema.parse(response?.data?.accounts_plan);
		} catch (error) {
			console.error('AccountPlanService.create', error);
			throw error;
		}
	}
}
