import type {
	UserForRegisterSchema,
	UserLoginSchema,
	UserSchema,
} from '../schema';
import type { z } from 'zod';

export interface IUserForLogin extends z.infer<typeof UserLoginSchema> {
	email: string;
	password: string;
}

export interface ILoggedInUser {
	token: string;
	user: IUser;
}

export interface IUserForRegister
	extends z.infer<typeof UserForRegisterSchema> {}

export interface IUser extends z.infer<typeof UserSchema> {}
