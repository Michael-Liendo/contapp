import type { z } from 'zod';
import type {
	UserForRegisterSchema,
	UserLoginSchema,
	UserSchema,
} from '../schema';

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

export interface IUserForUpdate extends Partial<IUser> {
	old_password: string;
}
