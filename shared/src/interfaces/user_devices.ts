import type {
	UserDeviceForCreateSchema,
	UserDeviceForUpdateSchema,
	UserDeviceSchema,
} from '../schema';
import type { z } from 'zod';

export interface IUserDevice extends z.infer<typeof UserDeviceSchema> {}

export interface IUserDeviceForCreate
	extends z.infer<typeof UserDeviceForCreateSchema> {}

export interface IUserDeviceForUpdate
	extends z.infer<typeof UserDeviceForUpdateSchema> {}
