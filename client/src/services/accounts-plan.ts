import fetch from '@/utils/fetch';
import { AccountPlanSchema } from '@contapp/shared';

import type {
	IAccountPlan,
	IAccountPlanForCreate,
	IAccountPlanForUpdate,
	IPaginationRequest,
	ISResponse,
} from '@contapp/shared';

export default class AccountsPlan {
	static async findAll(companyId: string, pagination?: IPaginationRequest) {
		const queryParams = new URLSearchParams();
		if (pagination?.page) {
			queryParams.append('page', pagination.page.toString());
		}
		if (pagination?.limit) {
			queryParams.append('limit', pagination.limit.toString());
		}

		const request = await fetch(
			`/accounts-plan/findAll/${companyId}?${queryParams.toString()}`,
		);

		const response: ISResponse<IAccountPlan[]> = await request.json();

		if (response.success === false)
			throw new Error('Error getting accounts plan');

		const data = AccountPlanSchema.array().parse(response?.data);

		return {
			...response,
			data: data,
		};
	}

	static async create(plan: IAccountPlanForCreate) {
		const request = await fetch('/accounts-plan/create', {
			method: 'POST',
			body: JSON.stringify(plan),
		});

		const response: ISResponse<IAccountPlan> = await request.json();

		if (request.status === 400) {
			const error = response as unknown as { errors: { message: string }[] };
			throw new Error(error.errors[0].message);
		}

		if (response.success === false) throw new Error('Error creating plan');

		return AccountPlanSchema.parse(response?.data);
	}

	static async update(id: string, plan: IAccountPlanForUpdate) {
		const request = await fetch(`/accounts-plan/update/${id}`, {
			method: 'PUT',
			body: JSON.stringify(plan),
		});

		const response: ISResponse<IAccountPlan> = await request.json();

		if (response.success === false) throw new Error('Error updating plan');

		return AccountPlanSchema.parse(response?.data);
	}
}
