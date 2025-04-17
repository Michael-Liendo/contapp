import { BadRequestError } from '../utils/errorHandler';
import getPagination from '../utils/getPagination';

import type { IPaginationRequest, ISReplyFindAll } from '@contapp/shared';
import Repository from '../repository';

export default class AdminService {
	static async getAll(
		master_name: string,
		company_id: string,
		r_pagination: Required<IPaginationRequest>,
	): Promise<ISReplyFindAll<Record<string, unknown>>> {
		const result = await Repository.admin.findAll(
			master_name,
			company_id,
			r_pagination,
		);

		const pagination = getPagination(
			r_pagination.page,
			r_pagination.limit,
			result.count,
		);

		return {
			data: result.data,
			pagination,
		};
	}

	static async getOne(
		master_name: string,
		master_id: string,
	): Promise<Record<string, unknown>> {
		const result = await Repository.admin.findOne(master_name, master_id);

		if (!result) throw new BadRequestError(`${master_name} not found`);

		return result;
	}

	static async create(
		master_name: string,
		data: Record<string, unknown>,
	): Promise<Record<string, unknown>> {
		const created = await Repository.admin.create(master_name, data);

		return created;
	}

	static async update(
		master_name: string,
		id: string,
		data: Record<string, unknown>,
	): Promise<Record<string, unknown>> {
		const current = await Repository.admin.findOne(master_name, id);

		if (!current) throw new BadRequestError(`${master_name} not found`);

		if (!current.company_id || typeof current.company_id !== 'string') {
			throw new BadRequestError('Invalid company_id in record');
		}

		const updated = await Repository.admin.update(master_name, id, data);

		return updated;
	}

	static async delete(master_name: string, id: string): Promise<void> {
		const current = await Repository.admin.findOne(master_name, id);

		if (!current) throw new BadRequestError(`${master_name} not found`);

		await Repository.admin.remove(master_name, id);
	}
}
