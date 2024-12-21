import { AccountPlanDatagrid } from '@/components/accounts-plan/datagrid';
import { AccountPlanModalCreate } from '@/components/accounts-plan/modal-create';
import { DataTable } from '@/components/table/data-table';
import { Button } from '@/components/ui/button';
import { useCompanyContext } from '@/context/CompanyContext';
import Services from '@/services';
import type { IPaginationResponse } from '@contapp/shared';
import { useState } from 'react';
import { useQuery } from 'react-query';

export default function AccountsPlan() {
	const { activeCompany } = useCompanyContext();

	const [creationOpen, setCreationOpen] = useState(false);

	const [pagination, setPagination] = useState<IPaginationResponse>({
		page: 0,
		limit: 10,
		hasNextPage: false,
		hasPreviousPage: false,
		total: 0,
	});

	const { data, isLoading } = useQuery(
		['accounts-plan', activeCompany, pagination],
		async () => {
			const data = await Services.accountPlan.findAll(activeCompany?.id ?? '', {
				page: pagination?.page ?? 0,
			});
			setPagination(data.pagination);
			return data.data;
		},
		{
			enabled: !!activeCompany?.id,
		},
	);

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
				data={data || []}
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
			<AccountPlanModalCreate open={creationOpen} setOpen={setCreationOpen} />
		</div>
	);
}
