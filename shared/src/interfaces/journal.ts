import type { z } from 'zod';
import type {
	JournalEntryForCreateSchema,
	JournalEntrySchema,
	JournalForCreateSchema,
	JournalQuerySchema,
	JournalSchema,
} from '../schema';

export interface IJournal extends z.infer<typeof JournalSchema> {}

export interface IJournalForCreate
	extends z.infer<typeof JournalForCreateSchema> {}

export interface IJournalEntry extends z.infer<typeof JournalEntrySchema> {}

export interface IJournalEntryForCreate
	extends z.infer<typeof JournalEntryForCreateSchema> {}

export interface IJournalQuery extends z.infer<typeof JournalQuerySchema> {}
