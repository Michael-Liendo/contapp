import { DataTableRowActions } from '../table/actions';
import { DataTableColumnHeader } from '../table/header';

import type { IJournalQuery } from '@contapp/shared';
import type { ColumnDef } from '@tanstack/react-table';

const masterName = 'accounts-plan';

export const JournalsDatagrid: ColumnDef<IJournalQuery>[] = [
	{
		accessorKey: 'journal_number',
		header: ({ column }) => <DataTableColumnHeader column={column} title='#' />,
	},
	{
		accessorKey: 'description',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Descripción' />
		),
	},
	{
		accessorKey: 'entry_date',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Fecha de creación' />
		),
		cell: ({ row }) => {
			return (
				<div className='flex space-x-2'>
					<span className='truncate font-medium'>
						{(row.getValue('entry_date') as Date).toLocaleDateString('es-ES', {
							month: '2-digit',
							day: '2-digit',
							year: 'numeric',
						})}
					</span>
				</div>
			);
		},
	},
	{
		id: 'actions',
		cell: ({ row }) => (
			<DataTableRowActions masterName={masterName} row={row} />
		),
	},
];
