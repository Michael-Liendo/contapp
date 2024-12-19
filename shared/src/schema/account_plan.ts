import { z } from 'zod';

export const AccountPlanSchema = z.object({
	id: z.string().describe('The unique identifier of the account plan'),
	company_id: z.string().describe('The company that owns the account plan'),
	name: z.string(),
	description: z.string().nullable(),
	created_at: z.coerce.date(),
	updated_at: z.coerce.date(),
});

export const AccountPlanForCreateSchema = z.object({
	company_id: z.string(),
	name: z.string(),
	description: z.string().optional(),
});

export const AccountPlanForUpdateSchema = AccountPlanForCreateSchema.partial();
