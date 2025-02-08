import type { TrialBalanceRequestSchema, TrialBalanceSchema } from '../schema';
import type { z } from 'zod';

export interface ITrialBalanceRequest
	extends z.infer<typeof TrialBalanceRequestSchema> {}

export interface ITrialBalance extends z.infer<typeof TrialBalanceSchema> {}
