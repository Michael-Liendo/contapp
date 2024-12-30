import Services from '../services';

import type { IUserForLogin, IUserForRegister } from '@contapp/shared';
import type { Reply, Request } from '../types';

export async function login(request: Request, reply: Reply) {
	const { email, password } = request.body as IUserForLogin;

	const user = await Services.auth.login({
		email,
		password,
	});

	return reply
		.code(201)
		.send({ success: true, message: 'User created', data: { token: user } });
}

export async function register(request: Request, reply: Reply) {
	const { first_name, last_name, email, password } =
		request.body as IUserForRegister;

	const user = await Services.auth.register({
		first_name,
		last_name,
		email,
		password,
	});

	return reply
		.code(201)
		.send({ success: true, message: 'User created', data: user });
}
