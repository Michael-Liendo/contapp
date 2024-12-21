import { TextField } from '@/components/text-field';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { useCompanyContext } from '@/context/CompanyContext';
import Services from '@/services';
import { toFormikValidationSchema } from '@/utils/toFormikValidationSchema';
import {
	AccountPlanForCreateSchema,
	AccountPlanForUpdateSchema,
	type IAccountPlanForCreate,
	type IAccountPlan,
	type IAccountPlanForUpdate,
} from '@contapp/shared';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useToast } from '../ui/use-toast';

export function AccountPlanModalCreate({
	open,
	setOpen,
	isEdit,
}: {
	open: boolean;
	setOpen: (open: boolean) => void;
	isEdit?: IAccountPlan;
}) {
	const { activeCompany } = useCompanyContext();

	const { toast } = useToast();
	const queryClient = useQueryClient();

	const update = useMutation({
		mutationFn: (accountPlan: IAccountPlanForUpdate) => {
			return Services.accountPlan.update(accountPlan);
		},
		onSuccess: () => {
			queryClient.invalidateQueries('accounts-plan');
		},
	});

	const create = useMutation({
		mutationFn: (accountPlan: IAccountPlanForCreate) => {
			return Services.accountPlan.create(accountPlan);
		},
		onSuccess: () => {
			queryClient.invalidateQueries('accounts-plan');
		},
	});

	const { values, errors, handleChange, handleSubmit, setFieldValue } =
		useFormik({
			initialValues: {
				name: '',
				company_id: activeCompany?.id ?? '',
				description: '',
			},
			validationSchema: toFormikValidationSchema(AccountPlanForCreateSchema),
			validateOnChange: false,
			validateOnBlur: false,
			onSubmit: async (values, { resetForm, setFieldValue }) => {
				if (isEdit) {
					const dto = await AccountPlanForUpdateSchema.parse({
						id: isEdit.id,
						...values,
					});
					update.mutate(dto);
				} else {
					const dto = await AccountPlanForCreateSchema.parse(values);

					create.mutate(dto);
				}

				setOpen(false);
				resetForm();

				setFieldValue('company_id', activeCompany?.id ?? '');

				toast({
					title: isEdit ? 'Plan de cuentas editado' : 'Plan de cuentas creado',
				});
			},
		});

	useEffect(() => {
		setFieldValue('company_id', activeCompany?.id ?? '');
	}, [activeCompany?.id]);

	return (
		<Dialog
			open={open}
			onOpenChange={(open) => {
				setOpen(open);
			}}
		>
			<DialogContent className='sm:max-w-[425px]'>
				<form
					id='mutate-accounts-plan'
					className='space-y-4'
					onSubmit={handleSubmit}
					noValidate
				>
					<DialogHeader>
						<DialogTitle>
							{isEdit ? 'Editar plan de cuentas' : 'Crear plan de cuentas'}
						</DialogTitle>
						<DialogDescription>
							Escribe los datos del plan de cuentas que deseas{' '}
							{isEdit ? 'editar' : 'crear'}.
						</DialogDescription>
					</DialogHeader>
					<div>
						<TextField
							label='Nombre'
							type='text'
							id='name'
							name='name'
							placeholder='Activo'
							autoComplete='off'
							value={values.name}
							error={errors.name}
							onChange={handleChange}
							required
						/>
						<TextField
							label='Descripción'
							type='text'
							id='description'
							name='description'
							placeholder='Descripción del plan de cuentas'
							autoComplete='off'
							value={values.description}
							error={errors.description}
							onChange={handleChange}
						/>
					</div>
					<DialogFooter>
						<Button form='mutate-accounts-plan' type='submit'>
							{isEdit ? 'Editar plan de cuentas' : 'Crear plan de cuentas'}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
