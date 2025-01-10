import type { ColumnDef } from '@tanstack/react-table';
import { useEffect, useState } from 'react';

export const defaultColumn = <T,>(): Partial<ColumnDef<T>> => ({
	cell: ({ getValue, row: { index }, column: { id }, table }) => {
		const initialValue = getValue();
		const [value, setValue] = useState(initialValue);

		const onBlur = () => {
			table.options.meta?.updateData(index, id, value);
		};

		useEffect(() => {
			setValue(initialValue);
		}, [initialValue]);

		return (
			<input
				value={value as string}
				onChange={(e) => setValue(e.target.value)}
				onBlur={onBlur}
			/>
		);
	},
});
