import { AccountPlanModalCreate } from '@/components/accounts-plan/modal-create';
import { DataTable } from '@/components/table/data-table';
import { Button } from '@/components/ui/button';
import { useCompanyContext } from '@/context/CompanyContext';
import { useState } from 'react';
import { CompanyDatagrid } from '@/components/company/datagrid';

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
			<AccountPlanModalCreate open={creationOpen} setOpen={setCreationOpen} />
		</div>
	);
}
