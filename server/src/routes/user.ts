import { UserController, me } from '../controllers/users';
import checkJwt from '../middlewares/checkJwt';

import { UserForUpdateSchema } from '@contapp/shared';
import type { FastifyInstance, RegisterOptions } from 'fastify';
import requestValidation from '../utils/requestValidation';

export default function user(
	fastify: FastifyInstance,
	_: RegisterOptions,
	done: () => void,
) {
	fastify.register(checkJwt);

	fastify.route({
		method: 'GET',
		url: '/me',
		handler: me,
	});

	fastify.route({
		method: 'PUT',
		url: '/',
		preHandler: requestValidation(UserForUpdateSchema),
		handler: UserController.updateUser,
	});

	done();
}
