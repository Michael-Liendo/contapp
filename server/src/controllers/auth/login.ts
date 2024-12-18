import Services from '../../services';

import type { IUserForLogin } from '@contapp/shared';
import type { Reply, Request } from '../../types';

export default async function login(request: Request, reply: Reply) {
	const { email, password } = request.body as IUserForLogin;

	const user = await Services.auth.login({
		email,
		password,
	});

	return reply
		.code(201)
		.send({ success: true, message: 'User created', data: { token: user } });
}
