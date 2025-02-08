import { z } from 'zod';

export const TrialBalanceRequestSchema = z.object({
	company_id: z
		.string()
		.uuid()
		.describe('The unique identifier of the company requesting the balance'),
	start_date: z
		.string()
		.describe('Start date of the period in YYYY-MM-DD format'),
	end_date: z.string().describe('End date of the period in YYYY-MM-DD format'),
});

export const TrialBalanceSchema = z.object({
	account_id: z
		.string()
		.uuid()
		.describe('The unique identifier of the account'),
	nomenclature: z.string().describe('The account code or classification'),
	account_name: z.string().describe('The name of the account'),
	initial_balance: z
		.number()
		.describe('The initial balance before the selected period'),
	debits: z.number().describe('Total debit transactions in the period'),
	credits: z.number().describe('Total credit transactions in the period'),
	final_balance: z
		.number()
		.describe('Final balance after applying debits and credits'),
});
