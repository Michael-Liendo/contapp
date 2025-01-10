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

export async function listByCompany(
	request: Request,
	reply: Reply,
): Promise<void> {
	const { page = 1, limit = 10 } = request.query as IPaginationRequest;
	const { company_id } = request.params as { company_id: string };

	if (!isValidUUID(company_id)) {
		throw new BadRequestError('Invalid company id');
	}

	const { data, pagination } = await Services.journals.listByCompany(
		company_id,
		{ page, limit },
	);

	return reply.code(200).send({
		success: true,
		message: 'Journals listed',
		data,
		pagination,
	});
}
