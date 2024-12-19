import Services from '../../services';

import type { IAccountPlanForCreate, IPagination } from '@contapp/shared';
import type { Reply, Request } from '../../types';

export async function findAll(request: Request, reply: Reply) {
	const { page = 1, limit = 10 } = request.query as IPagination;
	const { company_id } = request.params as { company_id: string };

	const accounts_plan = await Services.accountsPlan.getAll(company_id, {
		page,
		limit,
	});

	return reply
		.code(200)
		.send({ success: true, message: 'Ok', data: accounts_plan });
}

export async function create(request: Request, reply: Reply) {
	const { company_id } = request.params as { company_id: string };
	const account_plan = request.body as IAccountPlanForCreate;

	const accounts_plan = await Services.accountsPlan.create({
		...account_plan,
		company_id,
	});

	return reply
		.code(201)
		.send({ success: true, message: 'Ok', data: accounts_plan });
}
