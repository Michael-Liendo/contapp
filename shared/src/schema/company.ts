import { z } from 'zod';

export const CompanySchema = z.object({
	id: z.string().describe('The unique identifier of the company'),
	name: z.string(),
	color: z.string().nullable(),
	user_id: z.string().describe('The creator of the company'),
	created_at: z.coerce.date(),
	updated_at: z.coerce.date(),
});

export const CompanyForCreateSchema = z.object({
	name: z.string(),
	color: z.string().optional(),
	fiscal_identification: z.string().optional(),
	user_id: z.string().optional(),
});

export const CompanyForUpdateSchema = CompanyForCreateSchema.partial();
