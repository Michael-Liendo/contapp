import { useCallback, useState } from 'react';
import type { RowData, TableConfig } from '../types/datatable';

/**
 * Hook personalizado para manejar los datos de una tabla dinámica.
 * @param initialData Datos iniciales de la tabla.
 * @param config Configuración de la tabla, incluyendo columnas y campo primario.
 * @returns Funciones y estados para manejar ediciones, eliminaciones, y autocompletado en la tabla.
 */
export function useDataTable<T>(
	initialData: RowData<T>[],
	config?: TableConfig,
) {
	// Estado para los datos de la tabla
	const [data, setData] = useState<RowData<T>[]>(initialData);
	// Estado para la fila que se está editando
	const [editingRow, setEditingRow] = useState<number | null>(null);

	/**
	 * Inicia o cancela la edición de una fila específica.
	 * @param index Índice de la fila que se va a editar, o null para cancelar.
	 */
	const handleEdit = useCallback((index: number | null) => {
		setEditingRow(index);
	}, []);

	/**
	 * Guarda los cambios realizados en una fila.
	 * @param index Índice de la fila que se está editando.
	 * @param newData Nuevos datos para la fila.
	 */
	const handleSave = useCallback((index: number, newData: RowData<T>) => {
		setData((prevData) => {
			const newDataArray = [...prevData];
			if (index === prevData.length) {
				// Si el índice es igual al tamaño del array, se agrega una nueva fila
				newDataArray.push(newData);
			} else {
				// Actualiza una fila existente
				newDataArray[index] = newData;
			}
			return newDataArray;
		});
		setEditingRow(null);
	}, []);

	/**
	 * Elimina una fila específica de la tabla.
	 * @param index Índice de la fila que se va a eliminar.
	 */
	const handleDelete = useCallback((index: number) => {
		setData((prevData) => prevData.filter((_, i) => i !== index));
	}, []);

	/**
	 * Filtra los datos de la tabla según el valor proporcionado.
	 * @param value Valor utilizado para filtrar las filas.
	 * @returns Lista de filas que coinciden con el valor.
	 */
	const handleAutocomplete = useCallback(
		(value: string) => {
			if (!config || !config.primaryField) return [];
			const primaryField = config.primaryField;
			return data.filter((row) =>
				String(row[primaryField]).toLowerCase().includes(value.toLowerCase()),
			);
		},
		[data, config],
	);

	return {
		data,
		editingRow,
		handleEdit,
		handleSave,
		handleDelete,
		handleAutocomplete,
	};
}
