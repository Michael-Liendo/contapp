'use client';

import { DynamicDataTable } from '@/components/datatable/DynamicDatatable';
import { useDataTable } from '@/components/datatable/hooks/useDatatable';
import type {
	IOption,
	TableConfig,
} from '@/components/datatable/types/datatable';
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
import { useCompanyContext } from '@/context/CompanyContext';
import Services from '@/services';
import { toFormikValidationSchema } from '@/utils/toFormikValidationSchema';
import {
	type IAccountPlan,
	type IJournalEntryForCreate,
	JournalDestinationEnum,
	JournalForCreateSchema,
} from '@contapp/shared';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

/**
 * Componente para crear o editar un asiento contable.
 */
export default function CreatePage() {
	// Estados
	const { activeCompany } = useCompanyContext(); // Contexto para los datos de la empresa activa

	const { values, errors, handleChange, handleSubmit, setFieldValue } =
		useFormik({
			initialValues: {
				description: '',
				destination: JournalDestinationEnum.Values.DEBIT,
				company_id: activeCompany?.id ?? '',
				entries: [],
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

	// Configuración para la tabla de datos
	const [tableConfig, setTableConfig] = useState<TableConfig>({
		columns: [
			{
				key: 'account_id',
				label: 'Cuenta',
				editable: true,
				type: 'autocomplete-select',
				options: [] as IOption[],
			},
			{
				key: 'description',
				label: 'Descripción',
				editable: true,
				type: 'text',
			},
			{ key: 'debit', label: 'Debe Total', editable: true, type: 'number' },
			{ key: 'credit', label: 'Haber Total', editable: true, type: 'number' },
		],
		primaryField: 'id',
	});

	// Hook personalizado para manejar los datos de la tabla
	const { data, editingRow, handleEdit, handleSave, handleDelete } =
		useDataTable<IJournalEntryForCreate>([], tableConfig);

	// Obtiene los datos de las cuentas para la empresa activa
	const { data: servicesData } = useQuery(
		['accounts-plan', activeCompany],
		async () => {
			const data = await Services.accountsPlan.findAll(activeCompany?.id ?? '');
			return data.data;
		},
		{
			enabled: !!activeCompany?.id,
		},
	);

	useEffect(() => {
		if (servicesData) {
			const updatedConfig = { ...tableConfig };
			updatedConfig.columns[0].options = servicesData.map(
				(account: IAccountPlan) => ({
					id: account.id,
					value: `${account.nomenclature} - ${account.name}`,
				}),
			);
			setTableConfig(updatedConfig);
		}
	}, [servicesData]);

	useEffect(() => {
		setFieldValue('entries', data);
	}, [data]);

	return (
		<form onSubmit={handleSubmit}>
			{/* Sección de encabezado */}
			<div className='mb-4'>
				<div className='flex flex-row justify-between'>
					<h4 className='text-xl mb-6'>Nuevo Asiento Contable</h4>
					<div>
						<Button
							type='submit'
							className='w-full'
							variant='default'
							color='#000'
						>
							Crear
						</Button>
					</div>
				</div>

				{/* Sección del formulario */}
				<form className='space-y-6'>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
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
				</form>
			</div>

			{/* Sección de la tabla de datos */}
			<DynamicDataTable
				config={tableConfig}
				initialData={data}
				editingRow={editingRow}
				handleEdit={handleEdit}
				handleSave={handleSave}
				handleDelete={handleDelete}
			/>

			{errors.entries && (
				<div className='text-red-600 text-sm'>
					{Array.isArray(errors.entries)
						? errors.entries.map((error, index) => {
								const errorKey = Object.keys(error)[0];
								const errorValue = error[errorKey as keyof typeof error];
								return (
									<div key={errorKey}>
										{index + 1} {errorKey}:{' '}
										{typeof errorValue === 'function'
											? errorValue.toString()
											: errorValue}
									</div>
								);
							})
						: errors.entries}
				</div>
			)}
		</form>
	);
}
