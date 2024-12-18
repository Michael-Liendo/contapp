import type { z } from 'zod';
import type {
	CompanyForCreateSchema,
	CompanyForUpdateSchema,
	CompanySchema,
} from '../schema';

export interface ICompany extends z.infer<typeof CompanySchema> {}

export interface ICompanyForCreate
	extends z.infer<typeof CompanyForCreateSchema> {}

export interface ICompanyForUpdate
	extends z.infer<typeof CompanyForUpdateSchema> {}
