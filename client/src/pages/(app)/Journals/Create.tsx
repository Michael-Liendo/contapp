'use client';

import { DynamicDataTable } from '@/components/datatable/DynamicDatatable';
import { useDataTable } from '@/components/datatable/hooks/useDatatable';
import type {
	IOption,
	RowData,
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
import {
	type IAccountPlan,
	type IJournalForCreate,
	JournalDestinationEnum,
} from '@contapp/shared';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

/**
 * Interfaz que representa un asiento contable.
 */
export interface AccountingEntry {
	id: string;
	company_id: string | undefined;
	description: string;
	destination: 'Debe' | 'Haber';
	entry_date: string;
	entries: AccountingItem[];
}

/**
 * Interfaz que representa un ítem dentro de un asiento contable.
 */
export interface AccountingItem {
	id: string;
	account: string;
	debit: number;
	credit: number;
}

/**
 * Componente para crear o editar un asiento contable.
 */
export default function CreatePage() {
	// Estados
	const { activeCompany } = useCompanyContext(); // Contexto para los datos de la empresa activa

	// Datos del formulario para crear o editar un asiento
	const [formData, setFormData] = useState<AccountingEntry>({
		id: '',
		company_id: activeCompany?.id,
		description: '',
		destination: 'Debe',
		entry_date: new Date().toISOString().split('T')[0],
		entries: [],
	});

	// Configuración para la tabla de datos
	const [tableConfig, setTableConfig] = useState<TableConfig>({
		columns: [
			{
				key: 'id',
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
		useDataTable([], tableConfig);

	/**
	 * Restaura el formulario a su estado inicial.
	 */
	const resetForm = () => {
		setFormData({
			id: '',
			company_id: activeCompany?.id,
			description: '',
			destination: 'Debe',
			entry_date: new Date().toISOString().split('T')[0],
			entries: [],
		});
	};

	/**
	 * Envio de datos.
	 */
	const handleSubmit = () => {
		const newData = {
			...formData,
			entries: data.map((entry: RowData<IJournalForCreate>) => {
				const { id, debit, credit, description, journal_id } = entry;
				return { account_id: id, debit, credit, description, journal_id };
			}),
		};
		// Logica de API.
		console.log(newData);
		resetForm();
	};

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
		console.log('Se actualizo data', data);
	}, [data]);

	return (
		<div>
			{/* Sección de encabezado */}
			<div className='mb-4'>
				<div className='flex flex-row justify-between'>
					<h4 className='text-xl mb-6'>Nuevo Asiento Contable</h4>
					<div>
						<Button
							onClick={handleSubmit}
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
							// value={values.description}
							// error={errors.description}
							// onChange={handleChange}
						/>

						<div className='w-full'>
							<Label htmlFor=''>
								Destino <span className='text-red-600'>*</span>
							</Label>
							<Select
							// defaultValue={values.destination}
							// onValueChange={handleChange}
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
							// value={values.entry_date?.toISOString().split('T')[0]}
							// error={errors.entry_date as string}
							// onChange={({ target: { value } }) => {
							// const date = new Date(value);
							// setFieldValue('entry_date', date);
							// }}
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
		</div>
	);
}
