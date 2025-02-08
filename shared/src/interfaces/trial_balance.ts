import type { z } from 'zod';
import type { TrialBalanceRequestSchema, TrialBalanceSchema } from '../schema';

export interface ITrialBalanceRequest
	extends z.infer<typeof TrialBalanceRequestSchema> {}

export interface ITrialBalance extends z.infer<typeof TrialBalanceSchema> {}
