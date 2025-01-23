import { DataTable } from '@/components/table/data-table';
import { useCompanyContext } from '@/context/CompanyContext';
import Services from '@/services';
import { useState } from 'react';
import { useQuery } from 'react-query';

import { JournalsEntriesDatagrid } from '@/components/journals/entries-datagrid';
import type { IPaginationResponse } from '@contapp/shared';

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
			<div className='bg-zinc-50 rounded-sm p-2 mb-8'>
				<div className='border p-3 rounded-sm flex flex-row justify-between mb-3'>
					<p>Description</p>
					<p>Destiny</p>
					<p>Date</p>
					<p>Company</p>
				</div>
				<div className='flex flex-row ml-5 mr-5 justify-between'>
					<p id='valueDesc'>value</p>
					<p id='valueDestiny'>value</p>
					<p id='valueDate'>value</p>
					<p id='valueCompany'>value</p>
				</div>
			</div>

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
