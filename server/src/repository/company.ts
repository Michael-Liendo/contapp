import type { ICompany, ICompanyForCreate, IPagination } from '@contapp/shared';
import { InternalServerError } from '../utils/errorHandler';
import database from './database';

const companies = database<ICompany>('companies');

export class Company {
	/**
	 *  getCompanyByID - get a company with the ID
	 * @param id string
	 * @returns string ICompany
	 */
	static async getCompanyByID(id: string): Promise<ICompany | undefined> {
		const company = await companies.where({ id }).first();

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
		const allCompanies = await companies
			.where({ user_id })
			.limit(pagination.limit)
			.offset(pagination.page * pagination.limit);
		return allCompanies;
	}

	/**
	 *  createCompany - creates a company and returns the id
	 * @param company ICompany
	 * @returns string id
	 */
	static async createCompany(company: ICompanyForCreate): Promise<string> {
		const id = await companies.insert(company).returning('id').first();
		if (!id) throw new InternalServerError('Error creating company');
		return id.id;
	}

	/**
	 *  updateCompany - updates a company
	 * @param id string
	 * @param company ICompany
	 * @returns string id
	 */
	static async updateCompany(id: string, company: ICompany): Promise<string> {
		const updatedCompany = await companies.where({ id }).update(company);
		if (!updatedCompany) throw new Error('Error updating company');
		return id;
	}
}
