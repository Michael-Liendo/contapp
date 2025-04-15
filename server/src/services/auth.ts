import Repository from '../repository';
import { BadRequestError, UnauthorizedError } from '../utils/errorHandler';
import { comparePassword, hashPassword } from '../utils/password';

import type { IUser, IUserForLogin, IUserForRegister } from '@contapp/shared';
import Services from '.';
import { Jwt } from '../utils/jwt';

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
		const fb_token = await Services.firebase.createCustomToken(
			userWithoutPassword.id,
		);
		return { token, fb_token };
	}

	static async loginProvider(data: Record<string, unknown>, provider: string) {
		if (provider === 'google') {
			const googleData = data as unknown as {
				accessToken: { token: string };
				idToken: string;
				profile: {
					email: string;
					familyName: string;
					givenName: string;
					id: string;
					name: string;
					imageUrl: string;
				};
				responseType: string;
			};

			const email = await Jwt.verifyGoogleToken(googleData.idToken, true);

			let user = await Repository.users.getUserByEmail(email);

			if (!user) {
				user = await Repository.users.createUser({
					first_name: googleData.profile.givenName,
					last_name: googleData.profile.familyName,
					email: googleData.profile.email.toLowerCase(),
					// todo: check this
					password: '',
				});
				await Services.firebase.createUser(user);
			}

			const token = await Jwt.createToken({ id: user.id });
			const fb_token = await Services.firebase.createCustomToken(user.id);

			return { token, fb_token };
		}
	}

	static async renewToken(id: string) {
		const user = await Repository.users.getUserByID(id);

		if (!user) {
			throw new UnauthorizedError('UnauthorizedError');
		}
		const token = await Jwt.createToken({ id: user.id });

		const fb_token = await Services.firebase.createCustomToken(user.id);

		return { token, fb_token };
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

		const tokens = await Auth.login({
			email: data.email,
			password: data.password,
		});

		return { user, tokens: tokens };
	}
}
