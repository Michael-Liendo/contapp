import { create } from '../controllers/journals';
import checkJwt from '../middlewares/checkJwt';

import type { FastifyInstance, RegisterOptions } from 'fastify';

export default function journals(
	fastify: FastifyInstance,
	_: RegisterOptions,
	done: () => void,
) {
	fastify.register(checkJwt);

	fastify.route({
		method: 'POST',
		url: '/create',
		handler: create,
	});

	done();
}
