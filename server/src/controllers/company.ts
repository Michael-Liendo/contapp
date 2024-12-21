import Services from '../services';

import type { ICompanyForCreate, IPaginationRequest } from '@contapp/shared';
import type { Reply, Request } from '../types';

export async function create(request: Request, reply: Reply) {
	const companyDTO = request.body as ICompanyForCreate;
	const userId = request?.user?.id as string;

	const company = await Services.company.create({
		...companyDTO,
		user_id: userId,
	});

	return reply
		.code(201)
		.send({ success: true, message: 'Company created', data: company });
}

export async function findAll(request: Request, reply: Reply) {
	const { page = 0, limit = 100 } = request.query as IPaginationRequest;

	const companies = await Services.company.getAll(request?.user?.id as string, {
		page,
		limit,
	});

	return reply.code(200).send({
		success: true,
		message: 'Ok',
		data: companies.data,
		pagination: companies.pagination,
	});
}

export async function remove(request: Request, reply: Reply) {
	const { company_id } = request.params as { company_id: string };

	await Services.company.remove(company_id);

	return reply.code(204).send({
		success: true,
		message: 'Ok',
		data: null,
	});
}
