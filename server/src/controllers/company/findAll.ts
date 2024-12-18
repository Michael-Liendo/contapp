import Services from '../../services';

import type { Reply, Request } from '../../types';

export default async function findAll(request: Request, reply: Reply) {
	const companies = await Services.company.getAll(request?.user?.id as string);

	return reply
		.code(200)
		.send({ success: true, message: 'Ok', data: { companies } });
}
