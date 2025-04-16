import {
	CompanySchema,
	type ICompany,
	type ICompanyForCreate,
	type ICompanyForUpdate,
	type ISResponse,
} from '@contapp/shared';
import fetch from '../utils/fetch';

export default class Companies {
	static async findAll() {
		const request = await fetch('/companies/findAll');

		const response: ISResponse<ICompany[]> = await request.json();

		if (response.success === false) throw new Error('Error getting companies');

		return {
			...response,
			data: CompanySchema.array().parse(response?.data),
		};
	}

	static async create(company: ICompanyForCreate) {
		const request = await fetch('/companies/create', {
			method: 'POST',
			body: JSON.stringify(company),
		});

		const response: ISResponse<ICompany> = await request.json();

		if (response.success === false) throw new Error('Error creating company');

		return {
			...response,
			data: CompanySchema.parse(response?.data),
		};
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
		const request = await fetch('/companies/update', {
			method: 'PUT',
			body: JSON.stringify(company),
		});

		const response: ISResponse<ICompany> = await request.json();

		if (response.success === false) throw new Error('Error updating company');

		return {
			...response,
			data: CompanySchema.parse(response?.data),
		};
	}
}
