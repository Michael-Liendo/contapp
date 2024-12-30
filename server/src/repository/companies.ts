import type {
	ICompany,
	ICompanyForCreate,
	ICompanyForUpdate,
	IFindAllDatabase,
	IPaginationRequest,
} from '@contapp/shared';
import { InternalServerError } from '../utils/errorHandler';
import database from './database';

export class Companies {
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
		pagination: IPaginationRequest,
	): Promise<IFindAllDatabase<ICompany>> {
		const limit = pagination.limit ?? 10;
		const offset = (pagination.page ? pagination.page : 0) * limit;

		const totalResult = await database<ICompany>('companies')
			.where({ user_id })
			.count('id')
			.first();

		const count = totalResult?.count ? Number(totalResult?.count) : 0;

		const allCompanies = await database<ICompany>('companies')
			.where({ user_id })
			.limit(limit)
			.offset(offset);

		return {
			data: allCompanies,
			count: Number(count),
		};
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
	static async update(
		id: string,
		company: ICompanyForUpdate,
	): Promise<ICompany> {
		const updatedCompany = await database<ICompany>('companies')
			.where({ id })
			.update(company);
		if (!updatedCompany)
			throw new InternalServerError('Error updating company');

		const companyDB = await database<ICompany>('companies')
			.where({ id })
			.first();
		if (!companyDB) throw new InternalServerError('Error updating company');
		return companyDB;
	}

	/**
	 *  remove - deletes a company and all its associated data
	 *  todo: delete all associated data
	 * @param id string
	 * @returns
	 */
	static async remove(id: string): Promise<void> {
		await database('accounts_plan').where({ company_id: id }).delete();
		// todo: delete all associated data
		await database<ICompany>('companies').where({ id }).delete();
		return;
	}
}
