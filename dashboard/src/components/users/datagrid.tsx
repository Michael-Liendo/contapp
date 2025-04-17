import { DataTableRowActions } from '../table/actions';
import { DataTableColumnHeader } from '../table/header';

import { type IUser, MasterNameEnum } from '@contapp/shared';
import type { ColumnDef } from '@tanstack/react-table';
import { UsersModalMutate } from './modal';

export const UsersDatagrid: ColumnDef<IUser>[] = [
	{
		accessorKey: 'first_name',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='nombre' />
		),
	},
	{
		accessorKey: 'email',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='email' />
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
