import { DataTable } from '@/components/table/data-table';
import { useCompanyContext } from '@/context/CompanyContext';
import Services from '@/services';
import { useState } from 'react';
import { useQuery } from 'react-query';

import { JournalsEntriesDatagrid } from '@/components/journals/entries-datagrid';
import { TextField } from '@/components/text-field';
import { Label } from '@/components/ui/label';
import {
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	type IPaginationResponse,
	JournalDestinationEnum,
} from '@contapp/shared';
import { Select } from '@radix-ui/react-select';

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
				{/* numero del asiento y compania */}
				<h1 className='text-3xl text-primary font-bold'>55</h1>
				<h1 className='text-xl font-bold'>{activeCompany?.name}</h1>
			</div>
			<div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-5'>
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
				<h1 className='text-xl'>Asientos contables</h1>
			</div>

			<DataTable
				columns={JournalsEntriesDatagrid}
				data={[]}
				loading={isLoading}
			/>
		</div>
	);
}
