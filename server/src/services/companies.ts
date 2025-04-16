import type {
	ICompany,
	ICompanyForCreate,
	ICompanyForUpdate,
	IPaginationRequest,
	ISReplyFindAll,
} from '@contapp/shared';
import Repository from '../repository';
import { InternalServerError } from '../utils/errorHandler';
import getPagination from '../utils/getPagination';

export default class Companies {
	static async getByID(company_id: string): Promise<ICompany | undefined> {
		const company = await Repository.companies.getCompanyByID(company_id);

		return company;
	}

	static async getAll(
		user_id: string,
		r_pagination: Required<IPaginationRequest>,
	): Promise<ISReplyFindAll<ICompany>> {
		const companies = await Repository.companies.getUserCompanies(
			user_id,
			r_pagination,
		);

		const pagination = getPagination(
			r_pagination.page,
			r_pagination.limit,
			companies.count,
		);

		return {
			data: companies.data,
			pagination: pagination,
		};
	}

	static async create(companyDTO: ICompanyForCreate): Promise<ICompany> {
		const company = await Repository.companies.createCompany(companyDTO);

		return company;
	}

	static async remove(company_id: string): Promise<void> {
		await Repository.companies.remove(company_id);
		return;
	}

	static async update(
		company_id: string,
		company: ICompanyForUpdate,
	): Promise<ICompany> {
		const updatedCompany = await Repository.companies.update(
			company_id,
			company,
		);
		if (!updatedCompany)
			throw new InternalServerError('Error updating company');
		return updatedCompany;
	}
}
