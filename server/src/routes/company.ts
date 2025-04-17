import {
	CompanyForCreateSchema,
	CompanyForUpdateSchema,
} from '@contapp/shared';

import { create, findAll, remove, update } from '../controllers/companies';
import { checkUser } from '../middlewares/checkUser';

import type { FastifyInstance, RegisterOptions } from 'fastify';
import requestValidation from '../utils/requestValidation';

export default function company(
	fastify: FastifyInstance,
	_: RegisterOptions,
	done: () => void,
) {
	fastify.register(checkUser);

	fastify.route({
		method: 'GET',
		url: '/findAll',
		handler: findAll,
	});

	fastify.route({
		method: 'POST',
		url: '/create',
		preValidation: requestValidation(CompanyForCreateSchema),
		handler: create,
	});

	fastify.route({
		method: 'DELETE',
		url: '/delete/:company_id',
		handler: remove,
	});

	fastify.route({
		method: 'PUT',
		url: '/update',
		preValidation: requestValidation(CompanyForUpdateSchema),
		handler: update,
	});

	done();
}
