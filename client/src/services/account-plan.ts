import { AccountPlanSchema } from '@contapp/shared';
import fetch from '@/utils/fetch';

import type {
	IPaginationResponse,
	IAccountPlanForCreate,
	IPaginationRequest,
} from '@contapp/shared';

export default class AccountPlanService {
	static async findAll(companyId: string, pagination?: IPaginationRequest) {
		try {
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

			const response = await request.json();

			const data = AccountPlanSchema.array().parse(response?.data);

			return {
				data,
				pagination: response?.pagination as IPaginationResponse,
			};
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

			return AccountPlanSchema.parse(response?.data);
		} catch (error) {
			console.error('AccountPlanService.create', error);
			throw error;
		}
	}
}
