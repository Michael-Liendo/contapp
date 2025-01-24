import type { IJournalForCreate, IPaginationRequest } from '@contapp/shared';
import Services from '../services';
import type { Reply, Request } from '../types';
import { BadRequestError } from '../utils/errorHandler';
import { isValidUUID } from '../utils/isValidUUID';

export async function create(request: Request, reply: Reply) {
	const journalDto = request.body as IJournalForCreate;

	const { journal } = await Services.journals.create(journalDto);
	return reply.code(201).send({
		success: true,
		message: 'Journal created',
		data: journal,
	});
}

export async function findOne(request: Request, reply: Reply): Promise<void> {
	const { id } = request.params as { id: string };

	const journal = await Services.journals.getByID(id);
	return reply.code(200).send({
		success: true,
		message: 'Journal found',
		data: journal,
	});
}

export async function listByCompany(
	request: Request,
	reply: Reply,
): Promise<void> {
	const {
		page = 0,
		limit = 10,
		include_entries,
	} = request.query as IPaginationRequest & { include_entries?: boolean };
	const { company_id } = request.params as { company_id: string };

	if (!isValidUUID(company_id)) {
		throw new BadRequestError('Invalid company id');
	}

	const { data, pagination } = await Services.journals.listByCompany(
		company_id,
		{ page, limit },
		include_entries,
	);

	return reply.code(200).send({
		success: true,
		message: 'Journals listed',
		data,
		pagination,
	});
}
