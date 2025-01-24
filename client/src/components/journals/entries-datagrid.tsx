import { DataTableColumnHeader } from '../table/header';

import type { IJournalEntryQuery } from '@contapp/shared';
import type { ColumnDef } from '@tanstack/react-table';

export const JournalsEntriesDatagrid: ColumnDef<IJournalEntryQuery>[] = [
	{
		accessorKey: 'account',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Cuenta' />
		),
		accessorFn: (row) => `${row.account.nomenclature} - ${row.account.name}`,
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
