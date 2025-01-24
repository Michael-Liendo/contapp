import { DataTable } from '@/components/table/data-table';
import { useCompanyContext } from '@/context/CompanyContext';
import Services from '@/services';
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
import { JournalDestinationEnum } from '@contapp/shared';
import { Select } from '@radix-ui/react-select';
import { useParams } from 'react-router';

export default function JournalsHistory() {
	const { journal_id } = useParams() as { journal_id: string };
	const { companies } = useCompanyContext();

	const { data, isLoading } = useQuery(
		['journals-view', journal_id],
		async () => {
			const data = await Services.journals.findOne(journal_id);
			return data;
		},
	);

	return (
		<div>
			<div className='flex justify-between items-center mb-5'>
				<h1 className='text-3xl text-primary font-bold'>
					{data?.journal_number}
				</h1>
				<h1 className='text-xl font-bold'>
					{companies.find((company) => company.id === data?.company_id)?.name}
				</h1>
			</div>
			<div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-5'>
				<TextField
					value={data?.description || ''}
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
					<Select disabled value={data?.destination}>
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
					value={data?.entry_date?.toISOString().split('T')[0]}
				/>
			</div>

			<div className='flex justify-between items-center mb-5'>
				<h1 className='text-xl'>Asientos contables</h1>
			</div>

			<DataTable
				columns={JournalsEntriesDatagrid}
				data={data?.entries || []}
				loading={isLoading}
			/>
		</div>
	);
}
