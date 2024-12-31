import type { IJournalForCreate } from '@contapp/shared';
import type { Reply, Request } from '../types';
import Services from '../services';

export async function create(request: Request, reply: Reply) {
	const journalDto = request.body as IJournalForCreate;

	const { journal, entries } = await Services.journals.create(journalDto);
	return reply.code(201).send({
		success: true,
		message: 'Journal created',
		data: { journal, entries },
	});
}
