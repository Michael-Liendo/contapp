import Repository from '../repository';

import type {
	IAccountPlan,
	IAccountPlanForCreate,
	IFindAllResponse,
	IPaginationRequest,
} from '@contapp/shared';
import { InternalServerError } from '../utils/errorHandler';
import getPagination from '../utils/getPagination';

export default class AccountsPlan {
	static async getByID(
		account_plan_id: string,
	): Promise<IAccountPlan | undefined> {
		const account_plan = await Repository.accountsPlan.getByID(account_plan_id);

		return account_plan;
	}

	static async getAll(
		company_id: string,
		r_pagination: Required<IPaginationRequest>,
	): Promise<IFindAllResponse<IAccountPlan>> {
		const account_plans = await Repository.accountsPlan.getAll(
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
		const account_plan = await Repository.accountsPlan.create(account_plan_dto);

		return account_plan;
	}

	static async update(
		account_plan_id: string,
		account_plan: IAccountPlanForCreate,
	): Promise<IAccountPlan> {
		const updatedAccountPlan = await Repository.accountsPlan.update(
			account_plan_id,
			account_plan,
		);

		if (!updatedAccountPlan)
			throw new InternalServerError('Error updating account plan');

		return updatedAccountPlan;
	}

	static async delete(account_plan_id: string): Promise<void> {
		await Repository.accountsPlan.delete(account_plan_id);
		return;
	}
}
