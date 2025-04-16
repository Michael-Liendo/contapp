import { useState } from 'react';
import { useQuery } from 'react-query';

import { JournalsDatagrid } from '@/components/journals/datagrid';
import { DataTable } from '@/components/table/data-table';
import { useCompanyContext } from '@/context/CompanyContext';
import Services from '@/services';

import { NeedCompany } from '@/components/need-company';
import { Label } from '@/components/ui/label';
import { PrivateRoutesEnum } from '@/data/routesEnums';
import useSEO from '@/hooks/use-seo';
import type { IPaginationResponse } from '@contapp/shared';

export default function JournalsHistory() {
	useSEO({
		title: 'Historial de asientos | Contapp',
		description:
			'Vea y gestiona tu historial de asientos contables en Contapp, la solución para gestionar operaciones contables, balances y plan de cuentas.',
		keywords:
			'contapp, gestionar, operaciones, balances, plan de cuentas, asientos',
	});

	const { activeCompany } = useCompanyContext();

	const [pagination, setPagination] = useState<IPaginationResponse>({
		page: 0,
		limit: 0,
		hasNextPage: false,
		hasPreviousPage: false,
		total: 0,
	});

	const { data, isLoading } = useQuery(
		['journals-history', activeCompany, pagination],
		async () => {
			const data = await Services.journals.findAll(activeCompany?.id ?? '', {
				page: pagination?.page ?? 0,
			});
			if (data.pagination) setPagination(data.pagination);
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
				<h1 className='text-xl'>Asientos contables</h1>
			</div>
			<Label>Has click en un asiento para ver mas información</Label>

			<DataTable
				pagination={pagination}
				columns={JournalsDatagrid}
				route={PrivateRoutesEnum.JournalsView.replace('/:journal_id', '')}
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
