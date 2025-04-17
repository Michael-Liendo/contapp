import type { Reply, Request } from '../types';

export async function create(request: Request, reply: Reply) {
	return reply
		.code(201)
		.send({ success: true, message: 'User created', data: null });
}

export async function findAll(request: Request, reply: Reply) {
	return reply
		.code(200)
		.send({ success: true, message: 'User created', data: null });
}

export async function findOne(request: Request, reply: Reply) {
	return reply
		.code(200)
		.send({ success: true, message: 'User created', data: null });
}

export async function edit(request: Request, reply: Reply) {
	return reply
		.code(201)
		.send({ success: true, message: 'User created', data: null });
}

export async function remove(request: Request, reply: Reply) {
	return reply
		.code(204)
		.send({ success: true, message: 'User removed', data: null });
}
