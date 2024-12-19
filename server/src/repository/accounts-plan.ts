import database from './database';
import { InternalServerError } from '../utils/errorHandler';

import type {
	IAccountPlan,
	IAccountPlanForCreate,
	IPagination,
} from '@contapp/shared';

export class AccountPlan {
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
		pagination: IPagination,
	): Promise<IAccountPlan[]> {
		const account_plans = await database<IAccountPlan>('accounts_plan')
			.where({ company_id })
			.orderBy('created_at', 'desc')
			.limit(pagination.limit)
			.offset((pagination.page - 1) * pagination.limit);

		return account_plans;
	}

	static async create(
		account_plan: IAccountPlanForCreate,
	): Promise<IAccountPlan> {
		const account_plans = await database<IAccountPlan>('accounts_plan')
			.insert(account_plan)
			.returning('*')
			.first();

		if (!account_plans)
			throw new InternalServerError('Error creating account plan');

		return account_plans;
	}
}
