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

export function CompanyModalCreate({
	open,
	setOpen,
}: {
	open: boolean;
	setOpen: (open: boolean) => void;
}) {
	const [isOpen, setIsOpen] = useState(open);

	const { create } = useCompanyContext();
	const { values, errors, handleChange, handleSubmit } = useFormik({
		initialValues: { name: '' },
		validationSchema: toFormikValidationSchema(CompanyForCreateSchema),
		validateOnChange: false,
		validateOnBlur: false,
		onSubmit: async (values) => {
			const dto = CompanyForCreateSchema.parse(values);

			create(dto);
			setIsOpen(false);
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
