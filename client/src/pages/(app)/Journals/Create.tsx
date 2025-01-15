import { useFormik } from 'formik';

import { useCompanyContext } from '@/context/CompanyContext';
import { toFormikValidationSchema } from '@/utils/toFormikValidationSchema';

import { JournalsEntriesDatagrid } from '@/components/journals/entries-datagrid';
import { TextField } from '@/components/text-field';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { useEffect, useState } from 'react';

import { DataTable } from '@/components/table/data-table';
import { CommandShortcut } from '@/components/ui/command';
import { useKeyboard } from '@/hooks/use-keyboard';
import {
	type IJournalEntryForCreate,
	JournalDestinationEnum,
	JournalForCreateSchema,
} from '@contapp/shared';

export default function JournalsCreate() {
	const { activeCompany } = useCompanyContext();
	const [entries, setEntries] = useState<IJournalEntryForCreate[]>([]);

	const { values, errors, handleChange, handleSubmit, setFieldValue } =
		useFormik({
			initialValues: {
				description: '',
				destination: JournalDestinationEnum.Values.DEBIT,
				company_id: activeCompany?.id ?? '',
				entries: entries,
				entry_date: new Date(),
			},
			validationSchema: toFormikValidationSchema(JournalForCreateSchema),
			validateOnChange: false,
			validateOnBlur: false,
			onSubmit: async (values, { resetForm }) => {
				console.log(values);
				resetForm();
			},
		});

	useEffect(() => {
		setFieldValue('company_id', activeCompany?.id ?? '');
	}, [activeCompany?.id]);

	useEffect(() => {
		setFieldValue('entries', entries);
	}, [entries]);

	useKeyboard('F2', () => {
		setEntries((old) => [
			...old,
			// todo: improve this from '' to undefined
			{ account_id: '', description: '', debit: 0, credit: 0 },
		]);
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
					/>

					<div className='w-full'>
						<Label htmlFor=''>
							Destino <span className='text-red-600'>*</span>
						</Label>
						<Select
							defaultValue={values.destination}
							onValueChange={handleChange}
						>
							<SelectTrigger>
								<SelectValue placeholder='Destino' />
							</SelectTrigger>
							<SelectContent id='destination'>
								<SelectItem value={JournalDestinationEnum.Values.DEBIT}>
									Debe
								</SelectItem>
								<SelectItem value={JournalDestinationEnum.Values.CREDIT}>
									Crédito
								</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<TextField
						label='Fecha del asiento'
						type='date'
						id='entry_date'
						name='entry_date'
						placeholder='Fecha de creación'
						autoComplete='off'
						value={values.entry_date?.toISOString().split('T')[0]}
						error={errors.entry_date as string}
						onChange={({ target: { value } }) => {
							const date = new Date(value);
							setFieldValue('entry_date', date);
						}}
						required
					/>
				</div>

				<div className='flex justify-end space-x-4'>
					<Button
						size={'sm'}
						variant='secondary'
						onClick={() =>
							setEntries((old) => [
								...old,
								// todo: improve this from '' to undefined
								{ account_id: '', description: '', debit: 0, credit: 0 },
							])
						}
					>
						<CommandShortcut>F2</CommandShortcut>
						Agregar asiento
					</Button>
				</div>

				<DataTable
					columns={JournalsEntriesDatagrid}
					data={entries}
					loading={false}
				/>
				{errors.entries && (
					<div className='text-red-600 text-sm'>
						{Array.isArray(errors.entries)
							? errors.entries.map((error, index) => {
									const errorKey = Object.keys(error)[0] as keyof typeof error;
									return (
										<div key={errorKey}>
											{index + 1} {errorKey}: {error[errorKey]}
										</div>
									);
								})
							: errors.entries}
					</div>
				)}

				<Button form='create-journal' type='submit'>
					Crear asiento contable
				</Button>
			</form>
		</div>
	);
}
