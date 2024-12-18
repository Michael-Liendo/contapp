import { StatusCodes } from 'http-status-codes';

export abstract class ErrorWithDetails extends Error {
	constructor(
		message?: string,
		public details?: unknown,
		public stack?: string,
	) {
		super(message);
	}
	abstract statusCode: number;
}

export class InternalServerError extends ErrorWithDetails {
	name = 'INTERNAL_SERVER_ERROR';
	statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
}

export class BadRequestError extends ErrorWithDetails {
	name = 'BAD_REQUEST';
	statusCode = StatusCodes.BAD_REQUEST;
}
export class ConflictError extends ErrorWithDetails {
	name = 'CONFLICT';
	statusCode = StatusCodes.CONFLICT;
}
export class ForbiddenError extends ErrorWithDetails {
	name = 'FORBIDDEN';
	statusCode = StatusCodes.FORBIDDEN;
}
export class NotFoundError extends ErrorWithDetails {
	name = 'NOT_FOUND';
	statusCode = StatusCodes.NOT_FOUND;
}
export class UnauthorizedError extends ErrorWithDetails {
	name = 'UNAUTHORIZED';
	statusCode = StatusCodes.UNAUTHORIZED;
}
