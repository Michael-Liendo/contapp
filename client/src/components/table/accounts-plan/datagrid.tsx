import { DataTableRowActions } from '../actions';
import { DataTableColumnHeader } from '../header';

import { AccountPlanSchema, type IAccountPlan } from '@contapp/shared';
import type { ColumnDef } from '@tanstack/react-table';

export const AccountPlanDatagrid: ColumnDef<IAccountPlan>[] = [
	{
		accessorKey: 'name',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Nombre' />
		),
		cell: ({ row }) => {
			return (
				<div className='flex space-x-2'>
					<span className='max-w-[400px] truncate font-medium'>
						{row.getValue('name')}
					</span>
				</div>
			);
		},
	},
	{
		accessorKey: 'description',

		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Descripción' />
		),
		cell: ({ row }) => {
			return (
				<div className='flex space-x-2'>
					<span className='min-w-[500px] truncate font-medium'>
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
					<span className='w-[100px] truncate font-medium'>
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
		accessorKey: 'updated_at',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Fecha de actualización' />
		),
		cell: ({ row }) => {
			return (
				<div className='flex space-x-2'>
					<span className='w-[100px] truncate font-medium'>
						{(row.getValue('updated_at') as Date).toLocaleDateString('es-ES', {
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
			<DataTableRowActions schema={AccountPlanSchema} row={row} />
		),
	},
];
