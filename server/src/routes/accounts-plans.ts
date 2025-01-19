import { AccountPlanForCreateSchema } from '@contapp/shared';
import { create, findAll, remove, update } from '../controllers/accounts-plan';
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
		preValidation: requestValidation(AccountPlanForCreateSchema),
		handler: create,
	});

	fastify.route({
		method: 'PUT',
		url: '/update/:account_plan_id',
		preValidation: requestValidation(AccountPlanForCreateSchema),
		handler: update,
	});

	fastify.route({
		method: 'DELETE',
		url: '/delete/:account_plan_id',
		handler: remove,
	});

	done();
}
