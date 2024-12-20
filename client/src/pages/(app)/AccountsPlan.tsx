import { AccountPlanDatagrid } from '@/components/table/accounts-plan/datagrid';
import { DataTable } from '@/components/table/data-table';
import { useCompanyContext } from '@/context/CompanyContext';
import Services from '@/services';
import type { IPaginationResponse } from '@contapp/shared';
import { useState } from 'react';
import { useQuery } from 'react-query';

export default function AccountsPlan() {
	const { activeCompany } = useCompanyContext();

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
			<h1 className='text-xl mb-5'>Plan de cuentas</h1>

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
		</div>
	);
}
