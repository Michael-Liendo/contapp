import { AccountPlanDatagrid } from '@/components/accounts-plan/datagrid';
import { AccountPlanModalMutate } from '@/components/accounts-plan/modal';
import { DataTable } from '@/components/table/data-table';
import { Button } from '@/components/ui/button';
import useSEO from '@/hooks/use-seo';
import type { IPaginationResponse } from '@contapp/shared';
import { useState } from 'react';

export default function AccountsPlan() {
	useSEO({
		title: 'Plan de cuentas | Contapp',
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

	return (
		<div>
			<div className='flex justify-between items-center mb-5'>
				<h1 className='text-xl'>Plan de cuentas</h1>

				<Button variant='default' onClick={() => setCreationOpen(true)}>
					Crear
				</Button>
			</div>

			<DataTable
				pagination={pagination}
				columns={AccountPlanDatagrid}
				data={[]}
				loading={false}
				onPageChange={(page) => {
					setPagination((prevPagination) => {
						return {
							...prevPagination,
							page: page,
						};
					});
				}}
			/>
			<AccountPlanModalMutate open={creationOpen} setOpen={setCreationOpen} />
		</div>
	);
}
