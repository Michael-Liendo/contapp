import { DataTableRowActions } from '../table/actions';
import { DataTableColumnHeader } from '../table/header';

import { type IUser, MasterNameEnum } from '@contapp/shared';
import type { ColumnDef } from '@tanstack/react-table';
import { UsersModalMutate } from './modal';

export const UsersDatagrid: ColumnDef<IUser>[] = [
	{
		accessorKey: 'id',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='ID' />
		),
	},
	{
		accessorKey: 'active',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Active' />
		),
	},
	{
		accessorKey: 'first_name',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='First Name' />
		),
	},
	{
		accessorKey: 'last_name',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Last Name' />
		),
	},
	{
		accessorKey: 'email',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Email' />
		),
	},
	{
		accessorKey: 'role',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Role' />
		),
	},
	{
		accessorKey: 'password',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Password' />
		),
	},
	{
		accessorKey: 'notifications.information',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Notifications Info' />
		),
	},
	{
		accessorKey: 'notifications.general',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Notifications general' />
		),
	},
	{
		accessorKey: 'terms_accepted_at',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Terms Accepted At' />
		),
	},
	{
		accessorKey: 'email_confirmed_at',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Email Confirmed At' />
		),
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
		accessorKey: 'updated_at',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Updated At' />
		),
	},
	{
		id: 'actions',
		cell: ({ row }) => (
			<DataTableRowActions
				masterName={MasterNameEnum.Values.users}
				row={row}
				EditModal={UsersModalMutate}
			/>
		),
	},
];
