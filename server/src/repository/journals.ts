import {
	JournalSchema,
	type IFindAllDatabase,
	type IJournal,
	type IJournalForCreate,
	type IPaginationRequest,
} from '@contapp/shared';
import { InternalServerError } from '../utils/errorHandler';
import database from './database';

export class Journals {
	/**
	 * Create a new journal entry.
	 * @param dto - Data transfer object containing the details of the journal.
	 * @returns The created journal.
	 */
	static async create(dto: IJournalForCreate): Promise<IJournal> {
		const [journal] = await database<IJournal>('journals')
			.insert({
				company_id: dto.company_id,
				description: dto.description,
				destination: dto.destination,
				entry_date: dto.entry_date,
			})
			.returning('*');

		if (!journal) throw new InternalServerError('Error creating journal');

		return JournalSchema.parse(journal);
	}

	/**
	 * Get a journal by its ID.
	 * @param id - The unique identifier of the journal.
	 * @returns The journal if found, otherwise null.
	 */
	static async getById(id: string): Promise<IJournal | null> {
		const journal = await database<IJournal>('journals').where({ id }).first();
		return journal || null;
	}

	/**
	 * List all journals for a specific company with pagination.
	 * @param companyId - The ID of the company to list journals for.
	 * @param page - The current page number.
	 * @param limit - The number of items per page.
	 * @returns A list of journals and the total count.
	 */
	static async listByCompany(
		companyId: string,
		pagination: IPaginationRequest,
	): Promise<IFindAllDatabase<IJournal>> {
		const limit = pagination.limit ?? 100;
		const offset = (pagination.page ? pagination.page : 0) * limit;

		const totalResult = await database<IJournal>('journals')
			.where({ company_id: companyId })
			.count('id')
			.first();

		const total = totalResult?.count ? Number(totalResult?.count) : 0;

		const journals = await database<IJournal>('journals')
			.where({ company_id: companyId })
			.orderBy('entry_date', 'desc')
			.limit(limit)
			.offset(offset);

		return { data: journals, count: total };
	}

	/**
	 * Delete a journal by its ID.
	 * @param id - The unique identifier of the journal to delete.
	 * @returns True if the journal was deleted, otherwise false.
	 */
	static async delete(id: string): Promise<boolean> {
		const deleted = await database<IJournal>('journals').where({ id }).delete();
		return deleted > 0;
	}
}
