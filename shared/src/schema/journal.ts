import { z } from 'zod';

export const JournalDestinationEnum = ['DEBIT', 'CREDIT'] as const;

const JournalDestination = z.enum(JournalDestinationEnum);

export const JournalSchema = z.object({
	id: z.string().describe('The unique identifier of the journal'),
	company_id: z
		.string()
		.describe(
			'The unique identifier of the company associated with the journal',
		),
	description: z
		.string()
		.optional()
		.describe('A brief description of the journal'),
	destination: JournalDestination.describe('The destination of the journal'),
	entry_date: z.coerce.date().describe('The date of the journal'),
	created_at: z.coerce
		.date()
		.describe('Timestamp when the journal was created'),
	updated_at: z.coerce
		.date()
		.describe('Timestamp when the journal was last updated'),
});

export const JournalEntrySchema = z.object({
	id: z.string().describe('The unique identifier of the journal entry'),
	journal_id: z.string().describe('The unique identifier of the journal'),
	account_id: z.string().describe('The unique identifier of the account'),
	description: z
		.string()
		.optional()
		.describe('The description of the journal entry'),
	debit: z
		.number()
		.min(0)
		.default(0)
		.describe('The debit amount for this journal entry'),
	credit: z
		.number()
		.min(0)
		.default(0)
		.describe('The credit amount for this journal entry'),
	created_at: z.coerce.date(),
	updated_at: z.coerce.date(),
});

export const JournalEntryForCreateSchema = JournalEntrySchema.omit({
	id: true,
	created_at: true,
	updated_at: true,
});

export const JournalForCreateSchema = JournalSchema.omit({
	id: true,
	created_at: true,
	updated_at: true,
}).extend({
	destination: JournalDestination,
	journal_entries: z.array(JournalEntryForCreateSchema),
});
