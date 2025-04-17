import type { IPaginationRequest } from '@contapp/shared';
import Services from '../services';
import type { Reply, Request } from '../types';

export async function findAll(request: Request, reply: Reply) {
	const { page = 0, limit = 100 } = request.query as IPaginationRequest;
	const { master_name, company_id } = request.params as {
		master_name: string;
		company_id: string;
	};

	const result = await Services.admin.getAll(master_name, company_id, {
		page,
		limit,
	});

	return reply.code(200).send({
		success: true,
		message: 'Ok',
		data: result.data,
		pagination: result.pagination,
	});
}

export async function findOne(request: Request, reply: Reply) {
	const { master_name, id } = request.params as {
		master_name: string;
		id: string;
	};

	const item = await Services.admin.getOne(master_name, id);

	return reply.code(200).send({
		success: true,
		message: 'Ok',
		data: item,
	});
}

export async function create(request: Request, reply: Reply) {
	const { master_name } = request.params as { master_name: string };
	const { id: user_id } = request.user as { id: string };
	const body = request.body as Record<string, unknown>;

	const created = await Services.admin.create(master_name, body, user_id);

	return reply.code(201).send({
		success: true,
		message: 'Created successfully',
		data: created,
	});
}

export async function update(request: Request, reply: Reply) {
	const { master_name, id } = request.params as {
		master_name: string;
		id: string;
	};
	const { id: user_id } = request.user as { id: string };
	const body = request.body as Record<string, unknown>;

	const updated = await Services.admin.update(master_name, id, body, user_id);

	return reply.code(200).send({
		success: true,
		message: 'Updated successfully',
		data: updated,
	});
}

export async function remove(request: Request, reply: Reply) {
	const { master_name, id } = request.params as {
		master_name: string;
		id: string;
	};
	const { id: user_id } = request.user as { id: string };

	await Services.admin.delete(master_name, id, user_id);

	return reply.code(204).send();
}
