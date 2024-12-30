import { UserForRegisterSchema, UserLoginSchema } from '@contapp/shared';

import { login, register } from '../controllers/auth';
import requestValidation from '../utils/requestValidation';

import type { FastifyInstance, RegisterOptions } from 'fastify';

export default function auth(
	fastify: FastifyInstance,
	_: RegisterOptions,
	done: () => void,
) {
	fastify.route({
		method: 'POST',
		url: '/login',
		preHandler: requestValidation(UserLoginSchema),
		handler: login,
	});

	fastify.route({
		method: 'POST',
		url: '/register',
		preHandler: requestValidation(UserForRegisterSchema),
		handler: register,
	});

	done();
}
