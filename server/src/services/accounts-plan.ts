import Repository from '../repository';

import type {
	IAccountPlan,
	IAccountPlanForCreate,
	ISReplyFindAll,
	IPaginationRequest,
} from '@contapp/shared';
import { BadRequestError, InternalServerError } from '../utils/errorHandler';
import getPagination from '../utils/getPagination';
import { isCompanyOwner } from '../utils/isCompanyOwner';

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
	): Promise<ISReplyFindAll<IAccountPlan>> {
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
		userId: string,
	): Promise<IAccountPlan> {
		await isCompanyOwner(account_plan_dto.company_id, userId);

		const account_plan = await Repository.accountsPlan.create(account_plan_dto);

		return account_plan;
	}

	static async update(
		account_plan_id: string,
		account_plan: IAccountPlanForCreate,
		userId: string,
	): Promise<IAccountPlan> {
		const accountPlan = await Repository.accountsPlan.getByID(account_plan_id);

		if (!accountPlan) {
			throw new BadRequestError('Account plan not found');
		}

		await isCompanyOwner(accountPlan.company_id, userId);

		const updatedAccountPlan = await Repository.accountsPlan.update(
			account_plan_id,
			account_plan,
		);

		if (!updatedAccountPlan)
			throw new InternalServerError('Error updating account plan');

		return updatedAccountPlan;
	}

	static async delete(account_plan_id: string, userId: string): Promise<void> {
		const accountPlan = await Repository.accountsPlan.getByID(account_plan_id);

		if (!accountPlan) {
			throw new BadRequestError('Account plan not found');
		}

		await isCompanyOwner(accountPlan.company_id, userId);

		await Repository.accountsPlan.delete(account_plan_id);
		return;
	}
}
