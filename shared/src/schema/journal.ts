import { z } from 'zod';

export const JournalDestination = ['DEBIT', 'CREDIT'] as const;

export const JournalDestinationEnum = z.enum(JournalDestination);

export const JournalSchema = z.object({
	id: z.string().describe('The unique identifier of the journal'),
	journal_number: z.number().describe('The journal number'),
	company_id: z
		.string()
		.describe(
			'The unique identifier of the company associated with the journal',
		),
	description: z
		.string()
		.nullable()
		.describe('A brief description of the journal'),
	destination: JournalDestinationEnum.describe(
		'The destination of the journal',
	),
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
	debit: z.coerce
		.number()
		.min(0)
		.describe('The debit amount for this journal entry'),
	credit: z.coerce
		.number()
		.min(0)
		.describe('The credit amount for this journal entry'),
	created_at: z.coerce.date(),
	updated_at: z.coerce.date(),
});

export const JournalEntryForCreateSchema = JournalEntrySchema.extend({
	journal_id: z.string().optional(),
}).omit({
	id: true,
	created_at: true,
	updated_at: true,
});

export const JournalForCreateSchema = JournalSchema.omit({
	id: true,
	journal_number: true,
	created_at: true,
	updated_at: true,
}).extend({
	entries: z.array(JournalEntryForCreateSchema).min(1),
});

export const JournalQuerySchema = JournalSchema.extend({
	description: z.string().nullable(),
	entries: z.array(JournalEntrySchema).optional(),
});
