import Repository from '../repository';

import type {
	IAccountPlan,
	IAccountPlanForCreate,
	IPagination,
} from '@contapp/shared';

export default class AccountPlan {
	static async getByID(
		account_plan_id: string,
	): Promise<IAccountPlan | undefined> {
		const account_plan = await Repository.accountPlan.getByID(account_plan_id);

		return account_plan;
	}

	static async getAll(
		company_id: string,
		pagination: IPagination,
	): Promise<IAccountPlan[]> {
		const account_plans = await Repository.accountPlan.getAll(
			company_id,
			pagination,
		);

		return account_plans;
	}

	static async create(
		account_plan_dto: IAccountPlanForCreate,
	): Promise<IAccountPlan> {
		const account_plan = await Repository.accountPlan.create(account_plan_dto);

		return account_plan;
	}
}
