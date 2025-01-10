import { DataTableColumnHeader } from '../table/header';

import type { IJournalEntryForCreate } from '@contapp/shared';
import type { ColumnDef } from '@tanstack/react-table';

const masterName = 'journals';

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
