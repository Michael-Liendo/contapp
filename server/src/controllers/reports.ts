import { TrialBalanceRequestSchema } from '@contapp/shared';
import Services from '../services';
import type { Reply, Request } from '../types';
import { BadRequestError } from '../utils/errorHandler';

export async function trialBalance(request: Request, reply: Reply) {
	const { company_id, start_date, end_date } = request.query as {
		company_id: string;
		start_date: string;
		end_date: string;
	};

	const params = TrialBalanceRequestSchema.safeParse({
		company_id,
		start_date,
		end_date,
	});

	if (!params.success) {
		throw new BadRequestError(params.error.toString());
	}

	const trialBalance = await Services.trialBalance.getTrialBalance(params.data);

	return reply.code(200).send({
		success: true,
		message: 'Ok',
		data: trialBalance,
	});
}
