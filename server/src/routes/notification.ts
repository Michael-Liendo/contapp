import checkJwt from '../middlewares/checkJwt';

import { UserDeviceForCreateSchema } from '@contapp/shared';
import type { FastifyInstance, RegisterOptions } from 'fastify';
import { createDeviceToken } from '../controllers/notification';
import requestValidation from '../utils/requestValidation';

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
