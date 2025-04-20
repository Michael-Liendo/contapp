import { z } from 'zod';

export const AccountPlanSchema = z.object({
	id: z.string().describe('The unique identifier of the account plan'),
	company_id: z.string().describe('The company that owns the account plan'),
	nomenclature: z.string(),
	name: z.string(),
	created_at: z.coerce.date(),
	updated_at: z.coerce.date(),
});

// todo: for letter
// .regex(/^[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*$/, 'Formato inválido. Usa puntos para separar niveles'),/

export const AccountPlanForCreateSchema = z.object({
	company_id: z.string(),
	nomenclature: z
		.string({ required_error: 'El código de cuenta es requerido' })
		.regex(
			/^\d+(\.\d+)*$/,
			'Formato inválido. Usa números separados por puntos',
		),
	name: z.string({
		required_error: 'El nombre es requerido',
	}),
});

export const AccountPlanForUpdateSchema = AccountPlanForCreateSchema.partial();
