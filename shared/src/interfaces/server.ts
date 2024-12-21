export interface IReply {
	'2xx': {
		success: boolean;
		message: string;
		data: unknown;
		pagination?: IPaginationResponse;
	};
	400: {
		success: boolean;
		message: string;
		errors: IError[];
	};
	500: {
		success: boolean;
		message: string;
		errors?: IError;
	};
}

export interface IError {
	code: string;
	path: string;
	message: string;
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
