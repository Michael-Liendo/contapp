import Repository from '../repository';

import type {
	IAccountPlan,
	IAccountPlanForCreate,
	IPaginationRequest,
	ISReplyFindAll,
} from '@contapp/shared';
import { BadRequestError, InternalServerError } from '../utils/errorHandler';
import getPagination from '../utils/getPagination';
import { isCompanyOwner } from '../utils/isCompanyOwner';

export default class AccountsPlan {
	static async getByID(
		account_plan_id: string,
	): Promise<IAccountPlan | undefined> {
		const account_plan = await Repository.accountsPlan.getByID(account_plan_id);

		return account_plan;
	}

	static async getAll(
		company_id: string,
		r_pagination: Required<IPaginationRequest>,
	): Promise<ISReplyFindAll<IAccountPlan>> {
		const account_plans = await Repository.accountsPlan.getAll(
			company_id,
			r_pagination,
		);

		const pagination = getPagination(
			r_pagination.page,
			r_pagination.limit,
			account_plans.count,
		);

		return {
			data: account_plans.data,
			pagination,
		};
	}

	static async create(
		account_plan_dto: IAccountPlanForCreate,
		userId: string,
	): Promise<IAccountPlan> {
		await isCompanyOwner(account_plan_dto.company_id, userId);

		const codeParts = account_plan_dto.nomenclature.split('.');
		let currentCode = '';

		// Verificamos que existan todas las cuentas anteriores
		for (let i = 0; i < codeParts.length - 1; i++) {
			currentCode += (i === 0 ? '' : '.') + codeParts[i];

			const parentExists = await Repository.accountsPlan.findByCodeAndCompany(
				currentCode,
				account_plan_dto.company_id,
			);

			if (!parentExists) {
				throw new BadRequestError(
					`La cuenta superior '${currentCode}' no existe. Debes crearla antes.`,
				);
			}
		}

		if (
			await Repository.accountsPlan.findByCodeAndCompany(
				account_plan_dto.nomenclature,
				account_plan_dto.company_id,
			)
		) {
			throw new BadRequestError(
				`La cuenta '${account_plan_dto.nomenclature}' ya existe.`,
			);
		}

		const account_plan = await Repository.accountsPlan.create(account_plan_dto);

		return account_plan;
	}

	static async update(
		account_plan_id: string,
		account_plan: IAccountPlanForCreate,
		userId: string,
	): Promise<IAccountPlan> {
		const existingAccountPlan =
			await Repository.accountsPlan.getByID(account_plan_id);

		if (!existingAccountPlan) {
			throw new BadRequestError('Account plan not found');
		}

		await isCompanyOwner(existingAccountPlan.company_id, userId);

		const parts = account_plan.nomenclature.split('.');
		let currentNomenclature = '';

		for (let i = 0; i < parts.length - 1; i++) {
			currentNomenclature += (i === 0 ? '' : '.') + parts[i];

			const parentExists = await Repository.accountsPlan.findByCodeAndCompany(
				currentNomenclature,
				existingAccountPlan.company_id,
			);

			if (!parentExists) {
				throw new BadRequestError(
					`La cuenta superior '${currentNomenclature}' no existe. Debes crearla antes.`,
				);
			}
		}

		const updatedAccountPlan = await Repository.accountsPlan.update(
			account_plan_id,
			account_plan,
		);

		if (!updatedAccountPlan)
			throw new InternalServerError('Error updating account plan');

		return updatedAccountPlan;
	}

	static async delete(account_plan_id: string, userId: string): Promise<void> {
		const accountPlan = await Repository.accountsPlan.getByID(account_plan_id);

		if (!accountPlan) {
			throw new BadRequestError('Account plan not found');
		}

		await isCompanyOwner(accountPlan.company_id, userId);

		await Repository.accountsPlan.delete(account_plan_id);
		return;
	}
}
