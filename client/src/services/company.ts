import { CompanySchema, type ICompanyForCreate } from '@contapp/shared';
import fetch from '../utils/fetch';

export default class Company {
	static async getAll() {
		try {
			const request = await fetch('/company/findAll');

			const response = await request.json();

			return CompanySchema.array().parse(response.data.companies);
		} catch (error) {
			console.error('CompanyServices', error);
			throw error;
		}
	}

	static async create(company: ICompanyForCreate) {
		try {
			const request = await fetch('/company/create', {
				method: 'POST',
				body: JSON.stringify(company),
			});

			const response = await request.json();

			return CompanySchema.parse(response.data.company);
		} catch (error) {
			console.error('CompanyServices', error);
			throw error;
		}
	}

	static async remove(_id: string) {
		try {
			throw new Error('Not implemented');
		} catch (error) {
			console.error('CompanyServices', error);
			throw error;
		}
	}
}
