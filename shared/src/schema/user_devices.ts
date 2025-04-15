import { z } from 'zod';

export const UserDeviceSchema = z.object({
	id: z.string().describe('The unique identifier of the user device'),
	user_id: z.string().describe('The unique identifier of the user'),
	device_token: z.string().describe('The device token'),
	created_at: z.coerce.date(),
	updated_at: z.coerce.date(),
});

export const UserDeviceForCreateSchema = z.object({
	user_id: z.string().describe('The unique identifier of the user'),
	device_token: z.string().describe('The device token'),
});

export const UserDeviceForUpdateSchema = UserDeviceForCreateSchema.partial();
