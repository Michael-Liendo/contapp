import type { ICompany, ICompanyForCreate, IPagination } from '@contapp/shared';
import { InternalServerError } from '../utils/errorHandler';
import database from './database';

export class Company {
	/**
	 *  getCompanyByID - get a company with the ID
	 * @param id string
	 * @returns string ICompany
	 */
	static async getCompanyByID(id: string): Promise<ICompany | undefined> {
		const [company] = await database<ICompany>('companies').where({ id });

		return company;
	}

	/**
	 *  getUserCompanies - get all companies of a user
	 * @param id string
	 * @returns string ICompany[]
	 */
	static async getUserCompanies(
		user_id: string,
		pagination: IPagination,
	): Promise<ICompany[]> {
		const allCompanies = await database<ICompany>('companies')
			.where({ user_id })
			.limit(pagination.limit)
			.offset((pagination.page - 1) * pagination.limit);
		return allCompanies;
	}

	/**
	 *  createCompany - creates a company and returns the id
	 * @param companyDTO ICompany
	 * @returns string id
	 */
	static async createCompany(companyDTO: ICompanyForCreate): Promise<ICompany> {
		const [company] = await database<ICompany>('companies')
			.insert(companyDTO)
			.returning('*');

		if (!company) throw new InternalServerError('Error creating company');
		return company;
	}

	/**
	 *  updateCompany - updates a company
	 * @param id string
	 * @param company ICompany
	 * @returns string id
	 */
	static async updateCompany(id: string, company: ICompany): Promise<string> {
		const updatedCompany = await database<ICompany>('companies')
			.where({ id })
			.update(company);
		if (!updatedCompany) throw new Error('Error updating company');
		return id;
	}
}
