import type { IUser } from '@contapp/shared';
import type { FastifyRequest } from 'fastify';

export interface Request extends FastifyRequest {
	user?: IUser;
}
