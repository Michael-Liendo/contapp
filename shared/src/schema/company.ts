import { z } from 'zod';

export const CompanySchema = z.object({
	id: z.string().describe('The unique identifier of the company'),
	user_id: z.string().describe('The creator of the company'),
	name: z.string(),
	phone: z.string().nullable(),
	fiscal_identification: z.string().nullable(),
	email: z.string().email().nullable(),
	default_currency: z.string().nullable(),
	created_at: z.coerce.date(),
	updated_at: z.coerce.date(),
});

export const CompanyForCreateSchema = z.object({
	user_id: z.string().optional(),
	name: z.string(),
	fiscal_identification: z.string().optional(),
	phone: z.string().optional(),
	email: z.string().email().optional(),
	default_currency: z.string().optional(),
});

export const CompanyForUpdateSchema = CompanyForCreateSchema.partial();
