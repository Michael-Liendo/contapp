import { Button } from '@/components/ui/button';
import {
	Command,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { Check, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { AutocompleteSelect } from './AutoCompleteSelect';
import type { ColumnConfig, RowData } from './types/datatable';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select';

/**
 * Propiedades que acepta el componente EditableRow.
 */
interface EditableRowProps {
	/** Datos de la fila que se está editando. */
	rowData: RowData;
	/** Configuración de las columnas de la tabla. */
	columns: ColumnConfig[];
	/** Todos los datos de la tabla. */
	allData: RowData[];
	/** Función que se ejecuta al guardar la fila editada. */
	onSave: (newData: RowData) => void;
	/** Función que se ejecuta al cancelar la edición de la fila. */
	onCancel: () => void;
}

/**
 * Componente que permite editar una fila en la tabla de manera dinámica.
 */
export function EditableRow({
	rowData,
	columns,
	allData,
	onSave,
	onCancel,
}: EditableRowProps) {
	const [editedData, setEditedData] = useState<RowData>(rowData); // Estado para los datos editados de la fila

	useEffect(() => {
		setEditedData(rowData); // Actualiza los datos editados cuando cambian los datos originales
	}, [rowData]);

	/** Maneja los cambios en los campos de entrada de la fila editable. */
	const handleInputChange = (key: string, value: string | number) => {
		setEditedData((prev) => ({ ...prev, [key]: value }));
	};

	return (
		<tr>
			{columns.map((column) => (
				<td key={column.key} className='p-2'>
					{column.editable ? (
						column.type === 'select' ? (
							<Select
								value={editedData[column.key].toString()}
								onValueChange={(value) => handleInputChange(column.key, value)}
							>
								<SelectTrigger>
									<SelectValue placeholder='Seleccionar...' />
								</SelectTrigger>
								<SelectContent>
									{column.options?.map((option) => (
										<SelectItem key={option.value} value={option.value}>
											{option.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						) : column.type === 'autocomplete-select' ? (
							<Popover>
								<PopoverTrigger asChild>
									<Button variant='outline' className='w-full justify-between'>
										{editedData[column.key]?.toString() || 'Seleccionar'}
									</Button>
								</PopoverTrigger>
								<PopoverContent className='w-full p-2'>
									<Command>
										<CommandInput
											placeholder='Buscar...'
											onChange={(e) =>
												handleInputChange(column.key, e.target.value)
											}
										/>
										<CommandList>
											{column.options.map((option) => (
												<CommandItem
													key={option.value}
													onSelect={() =>
														handleInputChange(column.key, option.value)
													}
												>
													{option.label}
												</CommandItem>
											))}
										</CommandList>
									</Command>
								</PopoverContent>
							</Popover>
						) : (
							<Input
								type={column.type}
								value={editedData[column.key].toString()}
								onChange={(e) => handleInputChange(column.key, e.target.value)}
								className='w-full'
							/>
						)
					) : (
						editedData[column.key]
					)}
				</td>
			))}
			<td className='p-2'>
				<Button
					onClick={() => onSave(editedData)}
					variant='ghost'
					className='size-[40px] p-0'
				>
					<Check />
				</Button>
				<Button onClick={onCancel} variant='ghost' className='size-[40px] p-0'>
					<X />
				</Button>
			</td>
		</tr>
	);
}
