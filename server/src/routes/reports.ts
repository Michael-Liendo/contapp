import { trialBalance } from '../controllers/reports';
import checkJwt from '../middlewares/checkJwt';

import type { FastifyInstance, RegisterOptions } from 'fastify';

export default function reports(
	fastify: FastifyInstance,
	_: RegisterOptions,
	done: () => void,
) {
	fastify.register(checkJwt);

	fastify.route({
		method: 'GET',
		url: '/trial-balance',
		handler: trialBalance,
	});

	done();
}
