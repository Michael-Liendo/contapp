import Repository from '../repository';

import type {
	IAccountPlan,
	IAccountPlanForCreate,
	IFindAllResponse,
	IPaginationRequest,
} from '@contapp/shared';
import getPagination from '../utils/getPagination';

export default class AccountsPlan {
	static async getByID(
		account_plan_id: string,
	): Promise<IAccountPlan | undefined> {
		const account_plan = await Repository.accountPlan.getByID(account_plan_id);

		return account_plan;
	}

	static async getAll(
		company_id: string,
		r_pagination: Required<IPaginationRequest>,
	): Promise<IFindAllResponse<IAccountPlan>> {
		const account_plans = await Repository.accountPlan.getAll(
			company_id,
			r_pagination,
		);

		const pagination = getPagination(
			r_pagination.page,
			r_pagination.limit,
			account_plans.count,
		);

		return {
			data: account_plans.data,
			pagination,
		};
	}

	static async create(
		account_plan_dto: IAccountPlanForCreate,
	): Promise<IAccountPlan> {
		const account_plan = await Repository.accountPlan.create(account_plan_dto);

		return account_plan;
	}
}
