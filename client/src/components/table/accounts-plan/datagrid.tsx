import { DataTableRowActions } from '../actions';
import { DataTableColumnHeader } from '../header';

import type { IAccountPlan } from '@contapp/shared';
import type { ColumnDef } from '@tanstack/react-table';

const masterName = 'accounts-plan';

export const AccountPlanDatagrid: ColumnDef<IAccountPlan>[] = [
	{
		accessorKey: 'name',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Nombre' />
		),
	},
	{
		accessorKey: 'description',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Descripción' />
		),
		cell: ({ row }) => {
			return (
				<div className='flex space-x-2'>
					<span className='truncate font-medium'>
						{row?.getValue('description') || 'Sin descripción'}
					</span>
				</div>
			);
		},
	},
	{
		accessorKey: 'created_at',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Fecha de creación' />
		),
		cell: ({ row }) => {
			return (
				<div className='flex space-x-2'>
					<span className='truncate font-medium'>
						{(row.getValue('created_at') as Date).toLocaleDateString('es-ES', {
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
