import type { IJournalForCreate } from '@contapp/shared';
import Services from '../services';
import type { Reply, Request } from '../types';

export async function create(request: Request, reply: Reply) {
	const journalDto = request.body as IJournalForCreate;

	const { journal, entries } = await Services.journals.create(journalDto);
	return reply.code(201).send({
		success: true,
		message: 'Journal created',
		data: { journal, entries },
	});
}
