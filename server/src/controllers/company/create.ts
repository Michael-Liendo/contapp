import Services from '../../services';

import type { ICompanyForCreate } from '@contapp/shared';
import type { Reply, Request } from '../../types';

export default async function create(request: Request, reply: Reply) {
	const companyDTO = request.body as ICompanyForCreate;
	const userId = request?.user?.id as string;

	const company = await Services.company.create({
		...companyDTO,
		user_id: userId,
	});

	return reply
		.code(201)
		.send({ success: true, message: 'Company created', data: { company } });
}
