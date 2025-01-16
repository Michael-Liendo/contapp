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
			address: '',
			country: '',
			city: '',
			state: '',
			zipCode: '',
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
				address: isEdit.address ?? '',
				country: isEdit.country ?? '',
				city: isEdit.city ?? '',
				state: isEdit.state ?? '',
				zipCode: isEdit.zipCode ?? '',
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
							label='RIF'
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
						<div className='grid grid-cols-3 gap-2'>
  						<TextField 
  						  label='Dirección'
                id='company_address'
                name='address'
                placeholder='Clxx #xx-xx'
                autoComplete='on'
                value={values.address}
                error={errors.address}
                onChange={handleChange}
                required
  						/>
              <TextField 
                label='País'
                type='text'
                id='company_country'
                name='country'
                placeholder='United States'
                autoComplete='on'
                value={values.country}
                error={errors.country}
                onChange={handleChange}
                required
              />
              <TextField 
                label='Ciudad'
                type='text'
                id='company_city'
                name='city'
                placeholder='Seattle'
                autoComplete='on'
                value={values.city}
                error={errors.city}
                onChange={handleChange}
                required
              />
              <TextField 
                label='Estado'
                type='text'
                id='company_state'
                name='state'
                placeholder='Washington'
                autoComplete='on'
                value={values.state}
                error={errors.state}
                onChange={handleChange}
                required
              />
              <TextField 
                label='Código Postal'
                type='number'
                id='company_codeZip'
                name='codeZip'
                placeholder='98005'
                autoComplete='on'
                value={values.zipCode}
                error={errors.zipCode}
                onChange={handleChange}
              />
						</div>
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
