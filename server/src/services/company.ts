import type {
	ICompany,
	ICompanyForCreate,
	IFindAllResponse,
	IPaginationRequest,
} from '@contapp/shared';
import Repository from '../repository';
import getPagination from '../utils/getPagination';

export default class Company {
	static async getByID(company_id: string): Promise<ICompany | undefined> {
		const company = await Repository.company.getCompanyByID(company_id);

		return company;
	}

	static async getAll(
		user_id: string,
		r_pagination: IPaginationRequest,
	): Promise<IFindAllResponse<ICompany>> {
		const companies = await Repository.company.getUserCompanies(
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
		const company = await Repository.company.createCompany(companyDTO);

		return company;
	}

	static async update(company_id: string, company: ICompany): Promise<string> {
		const updatedCompany = await Repository.company.updateCompany(
			company_id,
			company,
		);
		if (!updatedCompany) throw new Error('Error updating company');
		return company_id;
	}
}
