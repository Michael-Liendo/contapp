import checkJwt from '../middlewares/checkJwt';

import type { FastifyInstance, RegisterOptions } from 'fastify';
import requestValidation from '../utils/requestValidation';
import { createDeviceToken } from '../controllers/notification';
import { UserDeviceForCreateSchema } from '@contapp/shared';

export default function notification(
	fastify: FastifyInstance,
	_: RegisterOptions,
	done: () => void,
) {
	fastify.register(checkJwt);

	fastify.route({
		// todo: define if create or update
		method: 'POST',
		url: '/device-token',
		preValidation: requestValidation(UserDeviceForCreateSchema),
		handler: createDeviceToken,
	});

	done();
}
