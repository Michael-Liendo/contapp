import type { IUserDeviceForCreate } from '@contapp/shared';
import type { Reply, Request } from '../types';
import Services from '../services';

export async function createDeviceToken(request: Request, reply: Reply) {
	const { user_id, device_token } = request.body as IUserDeviceForCreate;
	const user_device = await Services.notifications.createDeviceToken(
		user_id,
		device_token,
	);
	return reply.code(201).send({
		success: true,
		message: 'Device token created',
		data: user_device,
	});
}
