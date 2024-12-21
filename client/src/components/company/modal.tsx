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
import { toFormikValidationSchema } from '@/utils/toFormikValidationSchema';
import {
	CompanyForCreateSchema,
	CompanyForUpdateSchema,
	type ICompany,
} from '@contapp/shared';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useToast } from '../ui/use-toast';

export function CompanyModalMutate({
	open,
	setOpen,
	isEdit,
}: {
	open: boolean;
	setOpen: (open: boolean) => void;
	isEdit?: ICompany;
}) {
	const { create, update } = useCompanyContext();

	const { toast } = useToast();

	const { values, errors, handleChange, handleSubmit, setValues } = useFormik({
		initialValues: {
			name: '',
			phone: '',
			fiscal_identification: '',
			email: '',
		},
		validationSchema: toFormikValidationSchema(CompanyForCreateSchema),
		validateOnChange: false,
		validateOnBlur: false,
		onSubmit: async (values, { resetForm }) => {
			if (isEdit) {
				const dto = await CompanyForUpdateSchema.parse({
					id: isEdit.id,
					...values,
				});
				update(dto);
			} else {
				const dto = await CompanyForCreateSchema.parse(values);
				create(dto);
			}
			resetForm();
			setOpen(false);

			toast({
				title: isEdit ? 'Compañía editada' : 'Compañía creada',
			});
		},
	});

	useEffect(() => {
		if (isEdit) {
			setValues({
				name: isEdit.name ?? '',
				phone: isEdit.phone ?? '',
				fiscal_identification: isEdit.fiscal_identification ?? '',
				email: isEdit.email ?? '',
			});
		}
	}, [isEdit]);

	return (
		<Dialog
			open={open}
			onOpenChange={(open) => {
				setOpen(open);
			}}
		>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>
						{isEdit ? `Editar compañía ${isEdit.name} ` : 'Crear compañía'}
					</DialogTitle>
					<DialogDescription>
						Escribe los datos de la compañía que deseas{' '}
						{isEdit ? 'editar' : 'crear'}.
					</DialogDescription>
				</DialogHeader>
				<div>
					<form
						id='create-company'
						className='space-y-4'
						onSubmit={handleSubmit}
						noValidate
					>
						<TextField
							label='Nombre'
							type='text'
							id='company_name'
							name='name'
							placeholder='Acme Inc'
							autoComplete='off'
							value={values.name}
							error={errors.name}
							onChange={handleChange}
							required
						/>
						<TextField
							label='Identificación fiscal'
							type='text'
							id='company_fiscal_identification'
							name='fiscal_identification'
							placeholder='J12345678'
							autoComplete='off'
							value={values.fiscal_identification}
							error={errors.fiscal_identification}
							onChange={handleChange}
						/>
						<TextField
							label='Teléfono'
							type='text'
							id='company_phone'
							name='phone'
							placeholder='+58 xxxx xxxx'
							autoComplete='off'
							value={values.phone}
							error={errors.phone}
							onChange={handleChange}
						/>
						<TextField
							label='Email'
							type='text'
							id='company_email'
							name='email'
							placeholder='example@email.com'
							autoComplete='off'
							value={values.email}
							error={errors.email}
							onChange={handleChange}
						/>
					</form>
				</div>
				<DialogFooter>
					<Button form='create-company' type='submit'>
						Crear compañía
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
