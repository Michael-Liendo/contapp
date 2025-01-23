'use client';

import { Button } from '@/components/ui/button';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { EditableRow } from './EditableRow';
import type { RowData, TableConfig } from './types/datatable';

/**
 * Propiedades que acepta el componente DynamicDataTable.
 */
interface DynamicDataTableProps {
	/** Datos iniciales que se mostrarán en la tabla. */
	initialData: RowData[];
	/** Configuración de la tabla (columnas, tipos, etc.). */
	config: TableConfig | undefined;
	/** Función que se ejecuta al enviar nuevos datos. */
	onChange: (newData: RowData) => void;
	/** Índice de la fila que se está editando. */
	editingRow: number | null;
	/** Función para editar una fila específica. */
	handleEdit: (index: number | null) => void;
	/** Función para guardar los cambios de una fila. */
	handleSave: (index: number, newData: RowData) => void;
	/** Función para eliminar una fila específica. */
	handleDelete: (index: number) => void;
}

/**
 * Componente de tabla dinámica que permite editar, eliminar y crear nuevas filas.
 */
export function DynamicDataTable({
	initialData,
	config,
	onChange,
	editingRow,
	handleEdit,
	handleSave,
	handleDelete,
}: DynamicDataTableProps) {
	const [isCreatingNewRow, setIsCreatingNewRow] = useState(false); // Estado para manejar la creación de nuevas filas

	/** Maneja la creación de una nueva fila. */
	const handleCreateNewRow = () => {
		setIsCreatingNewRow(true);
		handleEdit(initialData.length);
	};

	/** Guarda los datos de una nueva fila. */
	const handleSaveNewRow = (newData: RowData) => {
		handleSave(initialData.length, newData);
		setIsCreatingNewRow(false);
		onChange(newData);
	};

	/** Cancela la creación de una nueva fila. */
	const handleCancelNewRow = () => {
		setIsCreatingNewRow(false);
		handleEdit(null);
	};

	if (!config) {
		return (
			<div>Error: No se ha proporcionado la configuración de la tabla.</div>
		);
	}

	// Crea una fila vacía basada en la configuración de columnas
	const emptyRow: RowData = Object.fromEntries(
		config.columns.map((col) => [col.key, '']),
	);

	const visibleColumns = config.columns; // Columnas visibles

	return (
		<div className='space-y-4'>
			<Table className='border-collapse border border-gray-200 rounded-lg'>
				<TableHeader className='uppercase'>
					<TableRow>
						{visibleColumns.map((column) => (
							<TableHead className='w-[445px]' key={column.key}>
								{column.label}
							</TableHead>
						))}
						<TableHead>Acciones</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{initialData.map((row, index) =>
						editingRow === index ? (
							<EditableRow
								key={row.id}
								rowData={row}
								columns={config.columns}
								allData={initialData}
								onSave={(newData) => handleSave(index, newData)}
								onCancel={() => handleEdit(null)}
							/>
						) : (
							<TableRow key={row.id}>
								{visibleColumns.map((column) => (
									<TableCell key={column.key}>{row[column.key]}</TableCell>
								))}
								<TableCell>
									<Button
										onClick={() => handleEdit(index)}
										variant='ghost'
										className='size-[40px] p-0'
									>
										<Pencil />
									</Button>
									<Button
										onClick={() => handleDelete(index)}
										variant='ghost'
										className='size-[40px] p-0'
									>
										<Trash2 />
									</Button>
								</TableCell>
							</TableRow>
						),
					)}
					{isCreatingNewRow ? (
						<EditableRow
							rowData={emptyRow}
							columns={config.columns}
							allData={initialData}
							onSave={handleSaveNewRow}
							onCancel={handleCancelNewRow}
						/>
					) : (
						<TableRow
							className='hover:bg-gray-100 cursor-pointer'
							onClick={handleCreateNewRow}
						>
							{visibleColumns.map((column) => (
								<TableCell key={column.key} className='text-gray-400'>
									{column.key === visibleColumns[0].key
										? 'Haga clic para agregar una nueva fila'
										: ''}
								</TableCell>
							))}
							<TableCell />
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	);
}
