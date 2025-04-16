import Services from '../services';

import type {
	ISignInWithProvider,
	IUserForLogin,
	IUserForRegister,
} from '@contapp/shared';
import type { Reply, Request } from '../types';

export async function register(request: Request, reply: Reply) {
	const { first_name, last_name, email, password } =
		request.body as IUserForRegister;

	const register_data = await Services.auth.register({
		first_name,
		last_name,
		email,
		password,
	});

	return reply
		.code(201)
		.send({ success: true, message: 'User created', data: register_data });
}

export async function login(request: Request, reply: Reply) {
	const { email, password } = request.body as IUserForLogin;

	const tokens = await Services.auth.login({
		email,
		password,
	});

	return reply
		.code(201)
		.send({ success: true, message: 'User logged', data: tokens });
}

export async function provider(request: Request, reply: Reply) {
	const body = request.body as ISignInWithProvider;

	const tokens = await Services.auth.loginProvider(body.result, body.provider);

	return reply
		.code(201)
		.send({ success: true, message: 'User logged', data: tokens });
}

export async function renewToken(request: Request, reply: Reply) {
	const user = request?.user;

	const tokens = await Services.auth.renewToken(user?.id as string);

	return reply
		.code(201)
		.send({ success: true, message: 'Token renewed', data: tokens });
}
