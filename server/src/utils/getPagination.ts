import type { IPaginationResponse } from '@contapp/shared';

export default function getPagination(
	page: number,
	limit: number,
	count: number,
): IPaginationResponse {
	const total = count;
	const hasPreviousPage = page > 1;
	const hasNextPage = page < Math.ceil(total / limit);

	return {
		page,
		limit,
		total,
		hasPreviousPage,
		hasNextPage,
	};
}
