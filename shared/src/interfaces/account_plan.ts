import type { z } from 'zod';
import type {
	AccountPlanForCreateSchema,
	AccountPlanForUpdateSchema,
	AccountPlanSchema,
} from '../schema';

export interface IAccountPlan extends z.infer<typeof AccountPlanSchema> {}

export interface IAccountPlanForCreate
	extends z.infer<typeof AccountPlanForCreateSchema> {}

export interface IAccountPlanForUpdate
	extends z.infer<typeof AccountPlanForUpdateSchema> {}
