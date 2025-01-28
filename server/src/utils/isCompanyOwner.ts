import Repository from '../repository';
import { BadRequestError, NotFoundError } from './errorHandler';

export const isCompanyOwner = async (companyId: string, userId: string) => {
	const company = await Repository.companies.getCompanyByID(companyId);
	if (!company) throw new NotFoundError('Company not found');

	if (company.user_id !== userId) {
		throw new BadRequestError('You are not the owner of this company');
	}

	return true;
};
