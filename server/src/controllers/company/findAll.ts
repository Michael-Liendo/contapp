import Services from '../../services';

import type { ICompany } from '@contapp/shared';
import type { Reply, Request } from '../../types';

export default async function findAll(request: Request): Promise<ICompany[]> {
	const companies = await Services.company.getAll(request?.user?.id as string);

	return companies;
}
