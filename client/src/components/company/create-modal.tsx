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
import { CompanyForCreateSchema } from '@contapp/shared';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useToast } from '../ui/use-toast';
import { useQueryClient } from 'react-query';

export function CompanyModalCreate({
	open,
	setOpen,
}: {
	open: boolean;
	setOpen: (open: boolean) => void;
}) {
	const { create } = useCompanyContext();

	const [isOpen, setIsOpen] = useState(open);

	const { toast } = useToast();

	const { values, errors, handleChange, handleSubmit } = useFormik({
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
			const dto = await CompanyForCreateSchema.parse(values);
			create(dto);
			resetForm();
			setIsOpen(false);

			toast({
				title: 'Compañía creada',
			});
		},
	});

	useEffect(() => {
		setIsOpen(open);
	}, [open]);

	return (
		<Dialog
			open={isOpen}
			onOpenChange={(open) => {
				setOpen(open);
				setIsOpen(open);
			}}
		>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>Crear compañía</DialogTitle>
					<DialogDescription>
						Escribe los datos de la compañía que deseas crear.
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
