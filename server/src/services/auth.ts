import Repository from '../repository';
import { BadRequestError, UnauthorizedError } from '../utils/errorHandler';
import { comparePassword, hashPassword } from '../utils/password';

import type { IUser, IUserForLogin, IUserForRegister } from '@contapp/shared';
import { Jwt } from '../utils/jwt';
import Services from '.';

export default class Auth {
	static async login(data: IUserForLogin) {
		const exitsUser = await Repository.users.getUserByEmail(data.email);

		if (!exitsUser) {
			throw new UnauthorizedError('UnauthorizedError');
		}

		const fbExitsUser = await Services.firebase.getUserByEmail(data.email);

		if (!fbExitsUser && exitsUser) {
			await Services.firebase.createUser(exitsUser);
		}

		const { password, ...userWithoutPassword } = exitsUser as Required<IUser>;

		const isCorrectPassword = await comparePassword(data.password, password);

		if (!isCorrectPassword) {
			throw new UnauthorizedError('UnauthorizedError');
		}

		const token = await Jwt.createToken({ id: userWithoutPassword.id });
		const fbToken = await Services.firebase.createCustomToken(
			userWithoutPassword.id,
		);
		return { token, fbToken };
	}

	static async register(data: IUserForRegister) {
		const { first_name, last_name, email, password } = data;

		const existsUser = await Repository.users.getUserByEmail(email);

		if (existsUser) {
			throw new BadRequestError('Email already exists', {
				code: 'EMAIL_ALREADY_EXISTS',
				path: 'email',
				message: 'Email already exists',
			});
		}

		const hashedPassword = await hashPassword(password);

		const registeredUser = {
			first_name,
			last_name,
			email,
			password: hashedPassword,
		};

		const user = await Repository.users.createUser(registeredUser);
		await Services.firebase.createUser(user);

		const token = await Auth.login({
			email: data.email,
			password: data.password,
		});

		return { user, token: token, fbToken: token.fbToken };
	}
}
