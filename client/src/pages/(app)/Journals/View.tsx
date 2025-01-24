import { DataTable } from '@/components/table/data-table';
import { useCompanyContext } from '@/context/CompanyContext';
import Services from '@/services';
import { useState } from 'react';
import { useQuery } from 'react-query';

import { JournalsEntriesDatagrid } from '@/components/journals/entries-datagrid';
import {
	JournalDestinationEnum,
	type IPaginationResponse,
} from '@contapp/shared';
import { TextField } from '@/components/text-field';
import { Select } from '@radix-ui/react-select';
import { Label } from '@/components/ui/label';
import {
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

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
			<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
				<TextField
					type='text'
					label='Descripción'
					id='description'
					name='description'
					placeholder='Descripción del asiento contable'
					autoComplete='off'
					readOnly
					disabled
				/>

				<div className='w-full'>
					<Label>Destino</Label>
					<Select disabled>
						<SelectTrigger>
							<SelectValue placeholder='Destino' />
						</SelectTrigger>
						<SelectContent id='destination'>
							<SelectItem value={JournalDestinationEnum.Values.DEBIT}>
								Debe
							</SelectItem>
							<SelectItem value={JournalDestinationEnum.Values.CREDIT}>
								Crédito
							</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<TextField
					readOnly
					disabled
					label='Fecha del asiento'
					type='date'
					id='entry_date'
					name='entry_date'
					placeholder='Fecha de creación'
					autoComplete='off'
				/>
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
