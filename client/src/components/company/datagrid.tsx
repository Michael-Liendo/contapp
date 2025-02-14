import { DataTableRowActions } from '../table/actions';
import { DataTableColumnHeader } from '../table/header';

import type { ICompany } from '@contapp/shared';
import type { ColumnDef } from '@tanstack/react-table';
import { CompanyModalMutate } from './modal';

const masterName = 'companies';

export const CompanyDatagrid: ColumnDef<ICompany>[] = [
	{
		accessorKey: 'name',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Nombre' />
		),
	},
	{
		accessorKey: 'fiscal_identification',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='RIF' />
		),
		cell: ({ row }) => {
			return (
				<div className='flex space-x-2'>
					<span className='truncate font-medium'>
						{row?.getValue('fiscal_identification')}
					</span>
				</div>
			);
		},
	},
	{
		accessorKey: 'email',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Email' />
		),
		cell: ({ row }) => {
			return (
				<div className='flex space-x-2'>
					<span className='truncate font-medium'>{row?.getValue('email')}</span>
				</div>
			);
		},
	},
	{
		accessorKey: 'phone',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Teléfono' />
		),
		cell: ({ row }) => {
			return (
				<div className='flex space-x-2'>
					<span className='truncate font-medium'>{row?.getValue('phone')}</span>
				</div>
			);
		},
	},
	{
		accessorKey: 'address',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Dirección' />
		),
		cell: ({ row }) => {
			return (
				<div className='flex space-x-2'>
					<span className='truncate font-medium'>
						{row?.getValue('address')}
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
			<DataTableRowActions
				masterName={masterName}
				row={row}
				EditModal={CompanyModalMutate}
			/>
		),
	},
];
