import { DataTable } from '@/components/table/data-table';
import { Button } from '@/components/ui/button';
import { useCompanyContext } from '@/context/CompanyContext';
import { useState } from 'react';
import { CompanyDatagrid } from '@/components/company/datagrid';
import { CompanyModalCreate } from '@/components/company/create-modal';

export default function ManageCompanies() {
	const { companies } = useCompanyContext();

	const [creationOpen, setCreationOpen] = useState(false);

	return (
		<div>
			<div className='flex justify-between items-center mb-5'>
				<h1 className='text-xl'>Compañías</h1>

				<Button variant='default' onClick={() => setCreationOpen(true)}>
					Crear compañía
				</Button>
			</div>

			<DataTable columns={CompanyDatagrid} data={companies} />
			<CompanyModalCreate open={creationOpen} setOpen={setCreationOpen} />
		</div>
	);
}
