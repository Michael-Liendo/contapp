import fetch from '@/utils/fetch';
import type { IPaginationRequest, ISResponse } from '@contapp/shared';

export default class AdminService {
	static async findAll(master_name: string, pagination?: IPaginationRequest) {
		const queryParams = new URLSearchParams();
		if (pagination?.page) {
			queryParams.append('page', pagination.page.toString());
		}
		if (pagination?.limit) {
			queryParams.append('limit', pagination.limit.toString());
		}

		const request = await fetch(
			`/admin/findAll/${master_name}?${queryParams.toString()}`,
		);

		if (!request.ok) {
			throw new Error(`Error fetching ${master_name}`);
		}

		const response: ISResponse<Record<string, unknown>> = await request.json();

		return response;
	}

	static async findOne(master_name: string, master_id: string) {
		const request = await fetch(`/admin/findOne/${master_name}/${master_id}`);

		if (!request.ok) {
			throw new Error(`Error fetching ${master_name} with ID ${master_id}`);
		}

		return request.json();
	}

	static async create(master_name: string, payload: Record<string, unknown>) {
		const request = await fetch(`/admin/create/${master_name}`, {
			method: 'POST',
			body: JSON.stringify(payload),
		});

		if (!request.ok) {
			throw new Error(`Error creating ${master_name}`);
		}

		return request.json();
	}

	static async update(
		master_name: string,
		master_id: string,
		payload: Record<string, unknown>,
	) {
		const request = await fetch(`/admin/update/${master_name}/${master_id}`, {
			method: 'PUT',
			body: JSON.stringify(payload),
		});

		if (!request.ok) {
			throw new Error(`Error updating ${master_name}`);
		}

		return request.json();
	}

	static async delete(master_name: string, master_id: string) {
		const request = await fetch(`/admin/delete/${master_name}/${master_id}`, {
			method: 'DELETE',
		});

		if (!request.ok) {
			throw new Error(`Error deleting ${master_name}`);
		}
	}
}
