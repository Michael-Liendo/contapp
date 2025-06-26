import Repository from '../repository';
import { BadRequestError, UnauthorizedError } from '../utils/errorHandler';
import { comparePassword, hashPassword } from '../utils/password';

import type { IUser, IUserForLogin, IUserForRegister } from '@contapp/shared';
import Services from '.';
import { Jwt } from '../utils/jwt';

export default class Auth {
	static async login(data: IUserForLogin) {
		const existsUser = await Repository.users.getUserByEmail(data.email);

		if (!existsUser) {
			throw new UnauthorizedError('UnauthorizedError');
		}

		if (!existsUser.password && existsUser.google_id) {
			throw new BadRequestError('Sign in with Google', {
				code: 'SIGN_IN_WITH_GOOGLE',
				path: 'provider',
				message: 'Sign in with Google',
			});
		}

		const { password, ...userWithoutPassword } = existsUser as Required<IUser>;

		const isCorrectPassword = await comparePassword(data.password, password);

		if (!isCorrectPassword) {
			throw new UnauthorizedError('UnauthorizedError');
		}

		const token = await Jwt.createToken({
			id: userWithoutPassword.id,
			uid: userWithoutPassword.uid,
		});
		const fb_token = await Services.firebase.createCustomToken(
			userWithoutPassword.uid,
		);
		return { token, fb_token };
	}

	static async loginProvider(data: Record<string, unknown>, provider: string) {
		if (provider !== 'google') {
			throw new Error('Unsupported provider');
		}

		const googleData = data as {
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

		const googleId = await Jwt.verifyGoogleToken(googleData.idToken, true);

		// Buscar por google_id
		let user = await Repository.users.getUserByGoogleId(googleId);

		// Si no existe por google_id, busca por email
		if (!user) {
			const existingUser = await Repository.users.getUserByEmail(
				googleData.profile.email.toLowerCase(),
			);

			if (existingUser) {
				// Vincular cuenta existente con Google
				if (!existingUser.google_id) {
					await Repository.users.updateUser(existingUser.id, {
						google_id: googleId,
					});
				}
				user = existingUser;
			} else {
				// Crear nuevo usuario con campos requeridos
				const newUser = await Auth.register({
					google_id: googleId,
					first_name: googleData.profile.givenName,
					last_name: googleData.profile.familyName,
					email: googleData.profile.email.toLowerCase(),
					password: '', // no se necesita, pero depende de tu lógica interna
				});
				user = newUser.user;
			}
		}

		const token = await Jwt.createToken({ id: user.id, uid: user.uid });
		const fb_token = await Services.firebase.createCustomToken(user.uid);

		return { token, fb_token };
	}

	static async renewToken(id: string) {
		const user = await Repository.users.getUserByID(id);

		if (!user) {
			throw new UnauthorizedError('UnauthorizedError');
		}
		const token = await Jwt.createToken({ id: user.id, uid: user.uid });

		const fb_token = await Services.firebase.createCustomToken(user.uid);

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

		const userToRegister = {
			first_name,
			last_name,
			email,
			password: hashedPassword,
		};

		const firebase_user = await Services.firebase.createUser(userToRegister);

		const user = await Repository.users.createUser({
			...userToRegister,
			uid: firebase_user.uid,
		});

		const tokens = await Auth.login({
			email: data.email,
			password: data.password,
		});

		return { user, tokens: tokens };
	}
}
