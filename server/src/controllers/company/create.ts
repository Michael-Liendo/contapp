import type { ICompanyForCreate } from '@contapp/shared';
import Services from '../../services';

import type { Reply, Request } from '../../types';

export default async function create(request: Request, reply: Reply) {
	const company = request.body as ICompanyForCreate;
	const userId = request?.user?.id as string;

	const id = await Services.company.create({ ...company, user_id: userId });

	return reply
		.code(201)
		.send({ success: true, message: 'Company created', data: { id } });
}
