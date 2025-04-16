import type {
	IJournalEntry,
	IJournalForCreate,
	IJournalQuery,
	IPaginationRequest,
	ISReplyFindAll,
} from '@contapp/shared';
import Repository from '../repository';
import { BadRequestError, NotFoundError } from '../utils/errorHandler';
import getPagination from '../utils/getPagination';
import { isValidUUID } from '../utils/isValidUUID';

export class Journal {
	/**
	 * Create a new journal and optionally its entries.
	 * @param journalDto - Data for creating the journal.
	 * @param entriesDto - Optional entries to be added to the journal.
	 * @returns The created journal and its entries.
	 */
	static async create(
		journalDto: IJournalForCreate,
	): Promise<{ journal: IJournalQuery }> {
		const created_journal = await Repository.journals.create(journalDto);

		let entries: IJournalEntry[] = [];
		if (journalDto.entries && journalDto.entries.length > 0) {
			entries = await Promise.all(
				journalDto.entries.map((entry) =>
					Repository.journalEntries.create({
						...entry,
						journal_id: created_journal.id,
					}),
				),
			);
		}

		const entriesWithAccount = await Promise.all(
			entries.map(async (entry) => {
				const account = await Repository.accountsPlan.getByID(entry.account_id);
				if (!account) {
					throw new NotFoundError('Account not found');
				}

				return {
					...entry,
					account: {
						name: account.name,
						nomenclature: account.nomenclature,
					},
				};
			}),
		);

		const journal: IJournalQuery = {
			...created_journal,
			description: journalDto.description ?? null,
			entries: entriesWithAccount,
		};

		return { journal };
	}

	/**
	 * Get a journal by its ID and return journal with entries.
	 * @param id - The unique identifier of the journal.
	 * @returns The journal if found, otherwise null.
	 */
	static async getByID(id: string): Promise<IJournalQuery> {
		if (!isValidUUID(id)) {
			throw new BadRequestError('Invalid journal id');
		}
		const journal = await Repository.journals.getById(id);

		if (!journal) {
			throw new NotFoundError('Journal not found');
		}

		const entries = await Repository.journalEntries.listByJournal(id);

		// format the entries and get the account for the entry
		const entriesWithAccount = await Promise.all(
			entries.map(async (entry) => {
				const account = await Repository.accountsPlan.getByID(entry.account_id);
				if (!account) {
					throw new BadRequestError('Account not found');
				}
				return {
					...entry,
					account: {
						id: account.id,
						name: account.name,
						nomenclature: account.nomenclature,
					},
				};
			}),
		);

		return { ...journal, entries: entriesWithAccount };
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
		includeEntries = false,
	): Promise<ISReplyFindAll<IJournalQuery>> {
		const company = await Repository.companies.getCompanyByID(companyId);
		if (!company) {
			throw new NotFoundError('Company not found');
		}

		const journals = await Repository.journals.listByCompany(
			companyId,
			r_pagination,
		);

		const pagination = getPagination(
			r_pagination.page,
			r_pagination.limit,
			journals.count,
		);

		let result: IJournalQuery[] = journals.data as IJournalQuery[];
		if (includeEntries) {
			const entries = await Promise.all(
				result.map(async (journal) => {
					const entries = await Repository.journalEntries.listByJournal(
						journal.id,
					);

					// format the entries and get the account for the entry
					const entriesWithAccount = await Promise.all(
						entries.map(async (entry) => {
							const account = await Repository.accountsPlan.getByID(
								entry.account_id,
							);
							if (!account) {
								throw new BadRequestError('Account not found');
							}
							return {
								...entry,
								account: {
									id: account.id,
									name: account.name,
									nomenclature: account.nomenclature,
								},
							};
						}),
					);

					return { ...journal, entries: entriesWithAccount };
				}),
			);
			result = entries.map((journal) => journal);
		}

		return { data: result, pagination };
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
