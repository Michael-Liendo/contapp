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

export const UserForUpdateSchema = z.object({
	first_name: z.string().optional(),
	last_name: z.string().optional(),
	password: z.string().optional(),
	old_password: z.string().optional(),
}).superRefine((data, ctx) => {
    if (data.password && !data.old_password) {
      ctx.addIssue({
		code: "custom",
        path: ["old_password"],
        message: "Old password is required when setting a new password.",
      });
    }

    if (data.old_password && !data.password) {
      ctx.addIssue({
		code: "custom",
        path: ["password"],
        message: "New password is required when providing the old password.",
      });
    }
  });