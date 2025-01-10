import { useFormik } from 'formik';

import { useCompanyContext } from '@/context/CompanyContext';
import { toFormikValidationSchema } from '@/utils/toFormikValidationSchema';

import {
	type IJournalForCreate,
	JournalDestinationEnum,
	JournalForCreateSchema,
} from '@contapp/shared';
import { Button } from '@/components/ui/button';
import { TextField } from '@/components/text-field';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

export default function JournalsCreate() {
	const { activeCompany } = useCompanyContext();

	const { values, errors, handleChange, handleSubmit } = useFormik({
		initialValues: {
			description: '',
			destination: JournalDestinationEnum.Values.DEBIT,
			company_id: activeCompany?.id ?? '',
			entries: [],
			entry_date: new Date(),
		} as IJournalForCreate,
		validationSchema: toFormikValidationSchema(JournalForCreateSchema),
		validateOnChange: false,
		validateOnBlur: false,
		onSubmit: async (values, { resetForm }) => {},
	});

	return (
		<div>
			<form
				id='create-journal'
				className='space-y-4'
				onSubmit={handleSubmit}
				noValidate
			>
				<div className='flex justify-between space-x-4'>
					<TextField
						type='text'
						label='Descripción'
						id='description'
						name='description'
						placeholder='Descripción del asiento contable'
						autoComplete='off'
						value={values.description}
						error={errors.description}
						onChange={handleChange}
						required
					/>

					<Select
						defaultValue={values.destination}
						onValueChange={handleChange}
					>
						<SelectTrigger className='w mt-6'>
							<SelectValue placeholder='Destino' />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value={JournalDestinationEnum.Values.DEBIT}>
								Debe
							</SelectItem>
							<SelectItem value={JournalDestinationEnum.Values.CREDIT}>
								Crédito
							</SelectItem>
						</SelectContent>
					</Select>

					<TextField
						label='Fecha del asiento'
						type='date'
						id='entry_date'
						name='entry_date'
						placeholder='Fecha de creación'
						autoComplete='off'
						value={values.entry_date.toDateString()}
						error={errors.entry_date as string}
						onChange={handleChange}
						required
					/>
				</div>
				<Button form='create-journal' type='submit'>
					Crear asiento contable
				</Button>
			</form>
		</div>
	);
}
