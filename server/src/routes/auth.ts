import { UserForRegisterSchema, UserLoginSchema } from '@contapp/shared';

import { login, provider, register, renewToken } from '../controllers/auth';
import { checkRequestJwt } from '../middlewares/checkUser';
import requestValidation from '../utils/requestValidation';

import type { FastifyInstance, RegisterOptions } from 'fastify';

export default function auth(
	fastify: FastifyInstance,
	_: RegisterOptions,
	done: () => void,
) {
	fastify.route({
		method: 'POST',
		url: '/register',
		preValidation: requestValidation(UserForRegisterSchema),
		handler: register,
	});

	fastify.route({
		method: 'POST',
		url: '/login',
		preValidation: requestValidation(UserLoginSchema),
		handler: login,
	});

	fastify.route({
		method: 'POST',
		url: '/provider',
		// todo: validate provider
		// preValidation: requestValidation(UserLoginSchema),
		handler: provider,
	});

	fastify.route({
		method: 'GET',
		url: '/renew',
		preHandler: checkRequestJwt,
		handler: renewToken,
	});

	done();
}
