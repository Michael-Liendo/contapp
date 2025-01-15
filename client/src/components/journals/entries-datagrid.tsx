import { DataTableColumnHeader } from '../table/header';

import type { IJournalEntryForCreate } from '@contapp/shared';
import type { ColumnDef, RowData } from '@tanstack/react-table';

const masterName = 'journals';

declare module '@tanstack/react-table' {
	// biome-ignore lint/correctness/noUnusedVariables: This is a custom type
	interface TableMeta<TData extends RowData> {
		updateData: (rowIndex: number, columnId: string, value: unknown) => void;
	}
}

export const JournalsEntriesDatagrid: ColumnDef<IJournalEntryForCreate>[] = [
	{
		accessorKey: 'account_id',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Cuenta' />
		),
	},
	{
		accessorKey: 'description',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Descripción' />
		),
	},
	{
		accessorKey: 'credit',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Debe' />
		),
	},
	{
		accessorKey: 'debit',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Haber' />
		),
	},
];
