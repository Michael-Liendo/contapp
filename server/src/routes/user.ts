import { me, UserController } from '../controllers/users';
import checkJwt from '../middlewares/checkJwt';

import type { FastifyInstance, RegisterOptions } from 'fastify';
import requestValidation from '../utils/requestValidation';
import { UserForUpdateSchema } from '@contapp/shared';

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
