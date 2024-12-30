import { me } from '../controllers/users';
import checkJwt from '../middlewares/checkJwt';

import type { FastifyInstance, RegisterOptions } from 'fastify';

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

	done();
}
