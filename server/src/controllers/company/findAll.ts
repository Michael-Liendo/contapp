import Services from '../../services';

import type { IPagination } from '@contapp/shared';
import type { Reply, Request } from '../../types';

export default async function findAll(request: Request, reply: Reply) {
	const { page = 1, limit = 10 } = request.query as IPagination & {
		page: number;
	};

	const companies = await Services.company.getAll(request?.user?.id as string, {
		page,
		limit,
	});

	return reply
		.code(200)
		.send({ success: true, message: 'Ok', data: { companies } });
}
