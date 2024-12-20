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
import { AccountPlanForCreateSchema } from '@contapp/shared';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useQueryClient } from 'react-query';
import { useToast } from '../ui/use-toast';

export function AccountPlanModalCreate({
	open,
	setOpen,
}: {
	open: boolean;
	setOpen: (open: boolean) => void;
}) {
	const { activeCompany } = useCompanyContext();

	const { toast } = useToast();
	const queryClient = useQueryClient();

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
			onSubmit: async (values) => {
				const dto = await AccountPlanForCreateSchema.parse(values);

				await Services.accountPlan.create(dto);
				queryClient.invalidateQueries('accounts-plan');

				setOpen(false);

				toast({
					title: 'Elemento Creado',
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
					id='create-accounts-plan'
					className='space-y-4'
					onSubmit={handleSubmit}
					noValidate
				>
					<DialogHeader>
						<DialogTitle>Crear plan de cuentas</DialogTitle>
						<DialogDescription>
							Escribe los datos del plan de cuentas que deseas crear.
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
						<Button form='create-accounts-plan' type='submit'>
							Crear plan de cuentas
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
