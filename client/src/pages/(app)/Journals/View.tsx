import { useState } from 'react';
import { useQuery } from 'react-query';
import { DataTable } from '@/components/table/data-table';
import { useCompanyContext } from '@/context/CompanyContext';
import Services from '@/services';

import type { IPaginationResponse } from '@contapp/shared';
import { JournalsEntriesDatagrid } from '@/components/journals/entries-datagrid';

export default function JournalsHistory() {
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
				<h1 className='text-xl'>Entries Datas Journals</h1>
		</div>

			<DataTable
				pagination={pagination}
				columns={JournalsEntriesDatagrid}
				data={[]}
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
