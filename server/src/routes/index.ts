import auth from './auth';
import user from './user';

import type { FastifyInstance, RegisterOptions } from 'fastify';
import type { ErrorWithDetails } from '../utils/errorHandler';

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
									code: error.details?.code,
									path: error.details?.path,
									message: error.details?.message,
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
	fastify.register(user, { prefix: '/user' });

	done();
}
