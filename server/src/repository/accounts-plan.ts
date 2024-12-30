import { InternalServerError } from '../utils/errorHandler';
import database from './database';

import type {
	IAccountPlan,
	IAccountPlanForCreate,
	IFindAllDatabase,
	IPaginationRequest,
} from '@contapp/shared';

export class AccountsPlan {
	static async getByID(
		account_plan_id: string,
	): Promise<IAccountPlan | undefined> {
		const account_plan = await database<IAccountPlan>('accounts_plan')
			.where({ id: account_plan_id })
			.first();

		return account_plan;
	}

	static async getAll(
		company_id: string,
		pagination: IPaginationRequest,
	): Promise<IFindAllDatabase<IAccountPlan>> {
		const limit = pagination.limit ?? 100;
		const offset = (pagination.page ? pagination.page : 0) * limit;

		const totalResult = await database<IAccountPlan>('accounts_plan')
			.where({ company_id })
			.count('id')
			.first();

		const total = totalResult?.count ? Number(totalResult?.count) : 0;

		const account_plans = await database<IAccountPlan>('accounts_plan')
			.where({ company_id })
			.orderBy('nomenclature', 'asc')
			.limit(limit)
			.offset(offset);

		return {
			data: account_plans,
			count: total,
		};
	}

	static async create(
		account_plan: IAccountPlanForCreate,
	): Promise<IAccountPlan> {
		const [account_plans] = await database<IAccountPlan>('accounts_plan')
			.insert(account_plan)
			.returning('*');

		if (!account_plans)
			throw new InternalServerError('Error creating account plan');

		return account_plans;
	}

	static async delete(account_plan_id: string): Promise<void> {
		await database<IAccountPlan>('accounts_plan')
			.delete()
			.where({ id: account_plan_id });
		return;
	}

	static async update(
		account_plan_id: string,
		account_plan: IAccountPlanForCreate,
	): Promise<IAccountPlan> {
		const updatedAccountPlan = await database<IAccountPlan>('accounts_plan')
			.where({ id: account_plan_id })
			.update(account_plan);

		if (!updatedAccountPlan)
			throw new InternalServerError('Error updating account plan');

		const accountPlanDB = await database<IAccountPlan>('accounts_plan')
			.where({ id: account_plan_id })
			.first();

		if (!accountPlanDB)
			throw new InternalServerError('Error updating account plan');

		return accountPlanDB;
	}
}
