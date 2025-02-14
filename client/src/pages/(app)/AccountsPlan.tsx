import { AccountPlanDatagrid } from '@/components/accounts-plan/datagrid';
import { AccountPlanModalMutate } from '@/components/accounts-plan/modal';
import { NeedCompany } from '@/components/need-company';
import { DataTable } from '@/components/table/data-table';
import { Button } from '@/components/ui/button';
import { useCompanyContext } from '@/context/CompanyContext';
import useSEO from '@/hooks/use-seo';
import Services from '@/services';
import type { IPaginationResponse } from '@contapp/shared';
import { useState } from 'react';
import { useQuery } from 'react-query';

export default function AccountsPlan() {
	useSEO({
		title: 'Plan de cuentas | Contapp',
		description:
			'Vea y gestiona tu plan de cuentas en Contapp, la solución para gestionar operaciones contables, balances y plan de cuentas.',
		keywords:
			'contapp, gestionar, operaciones, balances, plan de cuentas, cuentas',
	});
	const { activeCompany } = useCompanyContext();

	const [creationOpen, setCreationOpen] = useState(false);

	const [pagination, setPagination] = useState<IPaginationResponse>({
		page: 0,
		limit: 100,
		hasNextPage: false,
		hasPreviousPage: false,
		total: 0,
	});

	const { data, isLoading } = useQuery(
		['accounts-plan', activeCompany, pagination],
		async () => {
			const data = await Services.accountsPlan.findAll(
				activeCompany?.id ?? '',
				{
					page: pagination?.page ?? 0,
				},
			);
			setPagination(data.pagination);
			return data.data;
		},
		{
			enabled: !!activeCompany?.id,
		},
	);

	if (!activeCompany?.id) return <NeedCompany />;

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
			<AccountPlanModalMutate open={creationOpen} setOpen={setCreationOpen} />
		</div>
	);
}
