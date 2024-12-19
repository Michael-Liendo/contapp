import { AccountPlanForCreateSchema } from '@contapp/shared';
import { create, findAll } from '../controllers/accounts-plan';
import checkJwt from '../middlewares/checkJwt';
import requestValidation from '../utils/requestValidation';

import type { FastifyInstance, RegisterOptions } from 'fastify';

export default function accounts_plan(
	fastify: FastifyInstance,
	_: RegisterOptions,
	done: () => void,
) {
	fastify.register(checkJwt);

	fastify.route({
		method: 'GET',
		url: '/findAll/:company_id',
		handler: findAll,
	});

	fastify.route({
		method: 'POST',
		url: '/create',
		preHandler: requestValidation(AccountPlanForCreateSchema),
		handler: create,
	});

	done();
}
