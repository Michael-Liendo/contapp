import type { FastifyInstance, RegisterOptions } from 'fastify';
import { listProducts } from '../controllers/stripe';

export default function stripe(
	fastify: FastifyInstance,
	_: RegisterOptions,
	done: () => void,
) {
	fastify.route({
		method: 'GET',
		url: '/list-products',
		handler: listProducts,
	});

	done();
}
