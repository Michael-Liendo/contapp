import type { IPaginationResponse } from '@contapp/shared';

export default function getPagination(
	page: number | string,
	limit: number,
	count: number,
): IPaginationResponse {
	let pageNumber = Number(page);
	if (Number.isNaN(pageNumber)) {
		pageNumber = 1;
	}
	const total = count;
	const hasPreviousPage = pageNumber > 1;
	const hasNextPage = pageNumber < Math.ceil(total / limit);

	return {
		page: pageNumber,
		limit,
		total,
		hasPreviousPage,
		hasNextPage,
	};
}
