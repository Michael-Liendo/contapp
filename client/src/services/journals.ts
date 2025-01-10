import fetch from '@/utils/fetch';

import {
	type IJournalForCreate,
	type IPaginationRequest,
	type IPaginationResponse,
	JournalQuerySchema,
} from '@contapp/shared';

export default class Journals {
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
				`/journals/findAll/${companyId}?${queryParams.toString()}`,
			);

			const response = await request.json();

			const data = JournalQuerySchema.array().parse(response?.data);

			return {
				data,
				pagination: response?.pagination as IPaginationResponse,
			};
		} catch (error) {
			console.error('AccountPlanService.findAll', error);
			throw error;
		}
	}

	static async create(plan: IJournalForCreate) {
		try {
			const request = await fetch('/journals/create', {
				method: 'POST',
				body: JSON.stringify(plan),
			});

			const response = await request.json();

			return JournalQuerySchema.parse(response?.data);
		} catch (error) {
			console.error('AccountPlanService.create', error);
			throw error;
		}
	}
}
