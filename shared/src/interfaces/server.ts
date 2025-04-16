export interface IReply {
	200: IGetResponse<unknown>;
	201: IGetResponse<unknown>;
	204: IGetResponse<unknown>;
	400: {
		success: boolean;
		message: string;
		error?: string;
		errors?: IError[];
	};
	401: {
		success: boolean;
		message: string;
		error?: string;
		errors?: IError[];
	};
	500: {
		error: string;
		success: boolean;
		message: string;
		details?: string;
	};
}

export interface IError {
	code: string;
	path: string;
	message: string;
}

export interface IGetResponse<T> {
	success: boolean;
	message: string;
	data: T;
	pagination?: IPaginationResponse;
}

export interface IFindAllResponse<T> {
	data: T[];
	pagination: IPaginationResponse;
}

export interface IFindAllDatabase<T> {
	data: T[];
	count: number;
}

export interface IPaginationRequest {
	page: number;
	limit?: number;
}

export interface IPaginationResponse {
	page: number;
	limit: number;
	total: number;
	hasPreviousPage: boolean;
	hasNextPage: boolean;
}

export interface ISignInWithProvider {
	provider: 'google';
	result: Record<string, unknown>;
}
