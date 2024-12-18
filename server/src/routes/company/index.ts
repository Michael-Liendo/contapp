import { findAll } from '../../controllers/company';
import checkJwt from '../../middlewares/checkJwt';

import type { FastifyInstance, RegisterOptions } from 'fastify';

export default function company(
	fastify: FastifyInstance,
	_: RegisterOptions,
	done: () => void,
) {
	fastify.register(checkJwt);

	fastify.route({
		method: 'GET',
		url: '/findAll',
		handler: findAll,
	});

	done();
}
