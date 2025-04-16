import fetch from '@/utils/fetch';

import {
	type IJournal,
	type IJournalForCreate,
	type IPaginationRequest,
	type ISResponse,
	JournalQuerySchema,
} from '@contapp/shared';

export default class Journals {
	static async findOne(id: string) {
		const request = await fetch(`/journals/findOne/${id}`);

		const response: ISResponse<IJournal[]> = await request.json();

		if (response.success === false) throw new Error('Error getting journals');

		return {
			...response,
			data: JournalQuerySchema.parse(response?.data),
		};
	}

	static async findAll(companyId: string, pagination?: IPaginationRequest) {
		const queryParams = new URLSearchParams();
		if (pagination?.page) {
			queryParams.append('page', pagination.page.toString());
		}
		if (pagination?.limit) {
			queryParams.append('limit', pagination.limit.toString());
		}

		queryParams.append('include_entries', String(true));

		const request = await fetch(
			`/journals/findAll/${companyId}?${queryParams.toString()}`,
		);

		const response: ISResponse<IJournal[]> = await request.json();

		if (response.success === false) throw new Error('Error getting journals');

		const data = JournalQuerySchema.array().parse(response?.data);

		return {
			...response,
			data: data,
		};
	}

	static async create(plan: IJournalForCreate) {
		const request = await fetch('/journals/create', {
			method: 'POST',
			body: JSON.stringify(plan),
		});

		const response: ISResponse<IJournal> = await request.json();
		if (response.success === false) throw new Error('Error creating plan');

		return {
			...response,
			data: JournalQuerySchema.parse(response?.data),
		};
	}
}
