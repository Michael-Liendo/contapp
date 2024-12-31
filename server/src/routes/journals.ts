import { create, listByCompany } from '../controllers/journals';
import checkJwt from '../middlewares/checkJwt';

import { JournalForCreateSchema } from '@contapp/shared';
import type { FastifyInstance, RegisterOptions } from 'fastify';
import requestValidation from '../utils/requestValidation';

export default function journals(
	fastify: FastifyInstance,
	_: RegisterOptions,
	done: () => void,
) {
	fastify.register(checkJwt);

	fastify.route({
		method: 'POST',
		url: '/create',
		preHandler: requestValidation(JournalForCreateSchema),
		handler: create,
	});

	fastify.route({
		method: 'GET',
		url: '/findAll/:company_id',
		handler: listByCompany,
	});

	done();
}
