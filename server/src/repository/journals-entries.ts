import database from './database';
import type { IJournalEntryForCreate, IJournalEntry } from '@contapp/shared';

export class JournalEntries {
	/**
	 * Create a new journal entry.
	 * @param dto - Data transfer object containing journal entry details.
	 * @returns The created journal entry.
	 */
	static async create(dto: IJournalEntryForCreate): Promise<IJournalEntry> {
		const [entry] = await database<IJournalEntry>('journal_entries')
			.insert(dto)
			.returning('*');

		if (!entry) throw new Error('Error creating journal entry');
		return entry;
	}

	/**
	 * Get all journal entries for a specific journal.
	 * @param journalId - The ID of the journal.
	 * @returns A list of journal entries.
	 */
	static async listByJournal(journalId: string): Promise<IJournalEntry[]> {
		const entries = await database<IJournalEntry>('journal_entries')
			.where({ journal_id: journalId })
			.orderBy('created_at', 'asc');
		return entries;
	}

	/**
	 * Delete all journal entries for a specific journal.
	 * @param journalId - The ID of the journal.
	 * @returns The number of deleted entries.
	 */
	static async deleteByJournal(journalId: string): Promise<number> {
		return await database<IJournalEntry>('journal_entries')
			.where({ journal_id: journalId })
			.delete();
	}
}
