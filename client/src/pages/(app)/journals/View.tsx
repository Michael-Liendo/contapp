import { DataTable } from '@/components/table/data-table';
import { useCompanyContext } from '@/context/CompanyContext';
import Services from '@/services';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';

import { JournalsEntriesDatagrid } from '@/components/journals/entries-datagrid';
import { TotalizingHeader } from '@/components/journals/totalization-header';
import { LoadingFullScreen } from '@/components/loading';
import { TextField } from '@/components/text-field';
import useSEO from '@/hooks/use-seo';

export default function JournalsHistory() {
	useSEO({
		title: 'Historial de asientos | Contapp',
		description:
			'Vea y gestiona tu historial de asientos contables en Contapp, la solución para gestionar operaciones contables, balances y plan de cuentas.',
		keywords:
			'contapp, gestionar, operaciones, balances, plan de cuentas, asientos',
	});

	const { journal_id } = useParams() as { journal_id: string };
	const { companies } = useCompanyContext();

	const { data, isLoading } = useQuery(
		['journals-view', journal_id],
		async () => {
			const data = await Services.journals.findOne(journal_id);
			return data.data;
		},
	);

	if (isLoading) return <LoadingFullScreen className='h-[calc(100dvh-65px)]' />;

	return (
		<div>
			<div className='flex justify-between items-start mb-5'>
				<div>
					<h1 className='text-3xl text-primary font-bold'>
						#{data?.journal_number}
					</h1>
				</div>
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

			<TotalizingHeader entries={data?.entries} />
			<DataTable
				columns={JournalsEntriesDatagrid}
				data={data?.entries || []}
				loading={isLoading}
			/>
		</div>
	);
}
