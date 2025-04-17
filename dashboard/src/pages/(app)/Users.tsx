import { DataTable } from '@/components/table/data-table';
import { Button } from '@/components/ui/button';
import { UsersDatagrid } from '@/components/users/datagrid';
import { UsersModalMutate } from '@/components/users/modal';
import useSEO from '@/hooks/use-seo';
import Services from '@/services';
import {
	type IPaginationResponse,
	MasterNameEnum,
	UserSchema,
} from '@contapp/shared';
import { useState } from 'react';
import { useQuery } from 'react-query';

export default function Users() {
	useSEO({
		title: 'Usuarios | Contapp',
		description:
			'Vea y gestiona tu plan de cuentas en Contapp, la solución para gestionar operaciones contables, balances y plan de cuentas.',
		keywords:
			'contapp, gestionar, operaciones, balances, plan de cuentas, cuentas',
	});

	const [creationOpen, setCreationOpen] = useState(false);
	const [pagination, setPagination] = useState<IPaginationResponse>({
		page: 0,
		limit: 100,
		hasNextPage: false,
		hasPreviousPage: false,
		total: 0,
	});

	const { data: users, isLoading } = useQuery(
		[MasterNameEnum.Values.users, pagination],
		async () => {
			const data = await Services.admin.findAll(MasterNameEnum.Values.users, {
				page: pagination?.page ?? 0,
			});
			if (data.pagination) setPagination(data.pagination);
			console.log(data);
			return UserSchema.array().parse(data.data);
		},
	);

	return (
		<div>
			<div className='flex justify-between items-center mb-5'>
				<h1 className='text-xl'>Usuarios</h1>

				<Button variant='default' onClick={() => setCreationOpen(true)}>
					Crear
				</Button>
			</div>

			<DataTable
				pagination={pagination}
				columns={UsersDatagrid}
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
			<UsersModalMutate open={creationOpen} setOpen={setCreationOpen} />
		</div>
	);
}
