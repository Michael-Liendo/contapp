import {
	CompanySchema,
	type ICompanyForCreate,
	type ICompanyForUpdate,
} from '@contapp/shared';
import fetch from '../utils/fetch';

export default class Companies {
	static async findAll() {
		try {
			const request = await fetch('/companies/findAll');

			const response = await request.json();

			return CompanySchema.array().parse(response?.data);
		} catch (error) {
			console.error('CompanyServices', error);
			throw error;
		}
	}

	static async create(company: ICompanyForCreate) {
		try {
			const request = await fetch('/companies/create', {
				method: 'POST',
				body: JSON.stringify(company),
			});

			const response = await request.json();

			return CompanySchema.parse(response?.data);
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

	static async update(company: ICompanyForUpdate) {
		try {
			const request = await fetch('/companies/update', {
				method: 'PUT',
				body: JSON.stringify(company),
			});

			const response = await request.json();

			return CompanySchema.parse(response?.data);
		} catch (error) {
			console.error('CompanyServices', error);
			throw error;
		}
	}
}
