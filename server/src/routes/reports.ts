import { trialBalance } from '../controllers/reports';
import { checkUser } from '../middlewares/checkUser';

import type { FastifyInstance, RegisterOptions } from 'fastify';

export default function reports(
	fastify: FastifyInstance,
	_: RegisterOptions,
	done: () => void,
) {
	fastify.register(checkUser);

	fastify.route({
		method: 'GET',
		url: '/trial-balance',
		handler: trialBalance,
	});

	done();
}
