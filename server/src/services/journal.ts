import type {
	IFindAllResponse,
	IJournal,
	IJournalEntryForCreate,
	IJournalForCreate,
	IPaginationRequest,
} from '@contapp/shared';
import Repository from '../repository';
import getPagination from '../utils/getPagination';

export class Journal {
	/**
	 * Create a new journal and optionally its entries.
	 * @param journalDto - Data for creating the journal.
	 * @param entriesDto - Optional entries to be added to the journal.
	 * @returns The created journal and its entries.
	 */
	static async create(
		journalDto: IJournalForCreate,
	): Promise<{ journal: IJournal; entries?: IJournalEntryForCreate[] }> {
		const journal = await Repository.journals.create(journalDto);

		let entries: IJournalEntryForCreate[] = [];
		if (journalDto.journal_entries && journalDto.journal_entries.length > 0) {
			entries = await Promise.all(
				journalDto.journal_entries.map((entry) =>
					Repository.journalEntries.create({
						...entry,
						journal_id: journal.id,
					}),
				),
			);
		}

		return { journal, entries };
	}

	/**
	 * Get all journals for a company with their entries (if required).
	 * @param companyId - The company ID.
	 * @param includeEntries - Whether to include journal entries.
	 * @param page - Pagination: page number.
	 * @param limit - Pagination: limit per page.
	 * @returns A paginated list of journals and optionally their entries.
	 */
	static async listByCompany(
		companyId: string,
		r_pagination: Required<IPaginationRequest>,
		includeEntries = true,
	): Promise<IFindAllResponse<IJournal>> {
		const { data: journals, count } = await Repository.journals.listByCompany(
			companyId,
			r_pagination,
		);

		const pagination = getPagination(
			r_pagination.page,
			r_pagination.limit,
			count,
		);

		let result = journals.map((journal) => ({ journal }));

		if (includeEntries) {
			result = await Promise.all(
				result.map(async ({ journal }) => {
					const entries = await Repository.journalEntries.listByJournal(
						journal.id,
					);
					return { journal, entries };
				}),
			);
		}

		return { data: journals, pagination };
	}

	/**
	 * Delete a journal and its entries.
	 * @param journalId - The ID of the journal to delete.
	 * @returns True if successful, otherwise false.
	 */
	static async delete(journalId: string): Promise<boolean> {
		// Delete entries first to maintain referential integrity
		await Repository.journalEntries.deleteByJournal(journalId);

		// Delete the journal
		return await Repository.journals.delete(journalId);
	}
}
