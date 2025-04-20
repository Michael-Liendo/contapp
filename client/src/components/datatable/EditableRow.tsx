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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select';
import { TableRow } from '../ui/table';
import type { ColumnConfig, RowData } from './types/datatable';

/**
 * Propiedades que acepta el componente EditableRow.
 */
interface EditableRowProps<T> {
	/** Datos de la fila que se está editando. */
	rowData: RowData<T>;
	/** Configuración de las columnas de la tabla. */
	columns: ColumnConfig[];
	/** Todos los datos de la tabla. */
	allData: RowData<T>[];
	/** Función que se ejecuta al guardar la fila editada. */
	onSave: (newData: RowData<T>) => void;
	/** Función que se ejecuta al cancelar la edición de la fila. */
	onCancel: () => void;
}

/**
 * Componente que permite editar una fila en la tabla de manera dinámica.
 */
export function EditableRow<T>({
	rowData,
	columns,
	onSave,
	onCancel,
}: EditableRowProps<T>) {
	const [editedData, setEditedData] = useState<RowData<T>>(rowData); // Estado para los datos editados de la fila

	useEffect(() => {
		setEditedData(rowData); // Actualiza los datos editados cuando cambian los datos originales
	}, [rowData]);

	/** Maneja los cambios en los campos de entrada de la fila editable. */
	const handleInputChange = (key: string, value: string | number) => {
		setEditedData((prev) => ({ ...prev, [key]: value }));
	};

	return (
		<TableRow>
			{columns.map((column) => (
				<td key={column.key} className='p-2'>
					{column.editable ? (
						column.type === 'select' ? (
							<Select
								value={(editedData[column.key] as string)?.toString()}
								onValueChange={(value) => handleInputChange(column.key, value)}
							>
								<SelectTrigger>
									<SelectValue placeholder='Seleccionar...' />
								</SelectTrigger>
								<SelectContent>
									{column.options?.map((option) => (
										<SelectItem key={option.id} value={option.id}>
											{option.value}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						) : column.type === 'autocomplete-select' ? (
							<Popover>
								<PopoverTrigger asChild>
									<Button variant='outline' className='w-full justify-between'>
										{column.options?.find(
											(option) => option.id === editedData[column.key],
										)?.value ||
											column.defaultValue ||
											'Seleccionar cuenta'}
									</Button>
								</PopoverTrigger>
								<PopoverContent className='w-full p-2'>
									<Command>
										<CommandInput placeholder='Buscar...' />
										<CommandList>
											{column.options?.map((option) => (
												<CommandItem
													key={option.id}
													onSelect={() =>
														handleInputChange(column.key, option.id)
													}
												>
													{option.value}
												</CommandItem>
											))}
										</CommandList>
									</Command>
								</PopoverContent>
							</Popover>
						) : (
							<Input
								type={column.type}
								value={
									column.type === 'number'
										? String(editedData[column.key]) || column.defaultValue
										: (editedData[column.key] as string | number) ||
											column.defaultValue
								}
								onChange={(e) =>
									handleInputChange(
										column.key,
										column.type === 'number'
											? Number(e.target.value)
											: e.target.value,
									)
								}
								className='w-full'
							/>
						)
					) : (
						(editedData[column.key] as string) || column.defaultValue
					)}
				</td>
			))}
			<td className='p-2'>
				<Button
					onClick={() => onSave(editedData)}
					variant='ghost'
					className='size-7 p-0'
				>
					<Check />
				</Button>
				<Button onClick={onCancel} variant='ghost' className='size-7 p-0'>
					<X />
				</Button>
			</td>
		</TableRow>
	);
}
