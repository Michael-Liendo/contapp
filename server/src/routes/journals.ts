import { JournalForCreateSchema } from '@contapp/shared';

import { create, findOne, listByCompany } from '../controllers/journals';
import checkJwt from '../middlewares/checkJwt';
import requestValidation from '../utils/requestValidation';

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
		preValidation: requestValidation(JournalForCreateSchema),
		handler: create,
	});

	fastify.route({ method: 'GET', url: '/findOne/:id', handler: findOne });

	fastify.route({
		method: 'GET',
		url: '/findAll/:company_id',
		handler: listByCompany,
	});

	done();
}
