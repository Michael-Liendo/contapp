import { DataTableRowActions } from '@/components/table/actions';
import { DataTable } from '@/components/table/data-table';
import { Button } from '@/components/ui/button';
import useSEO from '@/hooks/use-seo';
import Services from '@/services';
import {
	type IPaginationResponse,
	MasterNameEnum,
	UserDeviceSchema,
} from '@contapp/shared';
import { useState } from 'react';
import { useQuery } from 'react-query';

export default function UserDevices() {
	useSEO({
		title: 'Usuarios | Dashboard Contapp',
		description:
			'Vea y gestiona tu plan de cuentas en Contapp, la solución para gestionar operaciones contables, balances y plan de cuentas.',
		keywords:
			'contapp, gestionar, operaciones, balances, plan de cuentas, cuentas',
	});

	const [_creationOpen, setCreationOpen] = useState(false);
	const [pagination, setPagination] = useState<IPaginationResponse>({
		page: 0,
		limit: 100,
		hasNextPage: false,
		hasPreviousPage: false,
		total: 0,
	});

	const { data: users, isLoading } = useQuery(
		[MasterNameEnum.Values.user_devices, pagination],
		async () => {
			const data = await Services.admin.findAll(
				MasterNameEnum.Values.user_devices,
				{
					page: pagination?.page ?? 0,
				},
			);
			if (data.pagination) setPagination(data.pagination);
			return UserDeviceSchema.array().parse(data.data);
		},
	);

	return (
		<div>
			<div className='flex justify-between items-center mb-5'>
				<h1 className='text-xl'>User Devices</h1>

				<Button variant='default' onClick={() => setCreationOpen(true)}>
					Crear
				</Button>
			</div>

			<DataTable
				pagination={pagination}
				columns={[
					{
						accessorKey: 'id',
					},
					{
						accessorKey: 'user_id',
					},
					{
						accessorKey: 'device_token',
					},
					{
						accessorKey: 'created_at',
					},
					{
						accessorKey: 'updated_at',
					},
					{
						id: 'actions',
						cell: ({ row }) => (
							<DataTableRowActions
								masterName={MasterNameEnum.Values.user_devices}
								row={row}
							/>
						),
					},
				]}
				data={users}
				loading={isLoading}
				onPageChange={(page) => {
					setPagination((prevPagination) => {
						return {
							...prevPagination,
							page: page,
						};
					});
				}}
			/>
		</div>
	);
}
