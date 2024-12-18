import { CompanyForCreateSchema } from '@contapp/shared';

import { create, findAll } from '../../controllers/company';
import checkJwt from '../../middlewares/checkJwt';

import type { FastifyInstance, RegisterOptions } from 'fastify';
import requestValidation from '../../utils/requestValidation';

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

	fastify.route({
		method: 'POST',
		url: '/create',
		preHandler: requestValidation(CompanyForCreateSchema),
		handler: create,
	});

	done();
}
