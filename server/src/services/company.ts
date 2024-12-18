import type { ICompany, ICompanyForCreate, IPagination } from '@contapp/shared';
import Repository from '../repository';

export default class Company {
	static async getByID(company_id: string): Promise<ICompany | undefined> {
		const company = await Repository.company.getCompanyByID(company_id);

		return company;
	}

	static async getAll(
		user_id: string,
		pagination: IPagination,
	): Promise<ICompany[]> {
		const companies = await Repository.company.getUserCompanies(
			user_id,
			pagination,
		);

		return companies;
	}

	static async create(company: ICompanyForCreate): Promise<string> {
		const id = await Repository.company.createCompany(company);

		return id;
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
