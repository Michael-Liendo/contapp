import { deleteUser, me, update } from '../controllers/users';
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
		url: '/update',
		preValidation: requestValidation(UserForUpdateSchema),
		handler: update,
	});

	fastify.route({
		method: 'DELETE',
		url: '/delete',
		handler: deleteUser,
	});

	done();
}
