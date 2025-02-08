import { z } from 'zod';
import { AccountPlanSchema } from './account_plan';

export const TrialBalanceRequestSchema = z.object({
	company_id: z
		.string()
		.uuid()
		.describe('The unique identifier of the company requesting the balance'),
	start_date: z.coerce
		.string()
		.date()
		.describe('Start date of the period in YYYY-MM-DD format'),
	end_date: z.coerce
		.string()
		.date()
		.describe('End date of the period in YYYY-MM-DD format'),
});

export const TrialBalanceSchema = z.object({
	account_plan: AccountPlanSchema.omit({
		company_id: true,
		created_at: true,
		updated_at: true,
	}),
	initial_balance: z.coerce
		.number()
		.describe('The initial balance before the selected period'),
	debits: z.coerce.number().describe('Total debit transactions in the period'),
	credits: z.coerce
		.number()
		.describe('Total credit transactions in the period'),
	final_balance: z.coerce
		.number()
		.describe('Final balance after applying debits and credits'),
});
