import { z } from 'zod';

export const UserForRegisterSchema = z.object({
	first_name: z.string(),
	last_name: z.string(),
	email: z.string().email().describe('unique'),
	password: z.string().min(4),
});

export const UserSchema = z.object({
	id: z.string(),
	first_name: z.string(),
	last_name: z.string(),
	email: z.string().email().describe('unique'),
	password: z.string().optional(),
	created_at: z.coerce.date(),
	updated_at: z.coerce.date(),
});

export const UserLoginSchema = z.object({
	email: z.string().email().describe('unique'),
	password: z.string().min(4),
});

export const UserForUpdateSchema = z
	.object({
		first_name: z.string().optional(),
		last_name: z.string().optional(),
		password: z.string().optional(),
		old_password: z.string().optional(),
	})
	.refine(
		(data) => {
			return (
				(!data.password || data.old_password) &&
				(!data.old_password || data.password)
			);
		},
		{
			message:
				'Password and old_password must both be provided if one is present.',
			path: ['password'],
		},
	);
