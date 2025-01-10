import accounts_plan from './accounts-plans';
import auth from './auth';
import company from './company';
import user from './user';

import type { FastifyInstance, RegisterOptions } from 'fastify';
import { BadRequestError, type ErrorWithDetails } from '../utils/errorHandler';
import journals from './journals';

export default function routes(
	fastify: FastifyInstance,
	_: RegisterOptions,
	done: () => void,
) {
	fastify.setErrorHandler((error: ErrorWithDetails, _, reply) => {
		if (error.statusCode >= 500) {
			fastify.log.error(error);
			console.error(error);
			return reply.code(error.statusCode || 500).send({
				error: error.name || 'INTERNAL_SERVER_ERROR',
				message: error.message,
				// todo: check if this is the right send the stack
				details: error.stack,
			});
		}
		if (error.statusCode >= 400) {
			fastify.log.info(error);
			return reply.status(error.statusCode || 400).send({
				success: false,
				error: error.name || 'BAD_REQUEST',
				message: error.statusCode === 400 ? 'Validation error' : error.message,
				errors:
					error.statusCode === 400
						? [
								{
									code: error.details?.code ?? error.name,
									path: error.details?.path ?? 'root',
									message: error.details?.message ?? error.message,
								},
							]
						: undefined,
			});
		}
	});

	fastify.get('/', async () => {
		return { hello: 'world' };
	});

	fastify.register(auth, { prefix: '/auth' });
	fastify.register(user, { prefix: '/users' });
	fastify.register(company, { prefix: '/companies' });
	fastify.register(accounts_plan, { prefix: '/accounts-plan' });
	fastify.register(journals, { prefix: '/journals' });

	done();
}
