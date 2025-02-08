import { CompanyDatagrid } from '@/components/company/datagrid';
import { CompanyModalMutate } from '@/components/company/modal';
import { DataTable } from '@/components/table/data-table';
import { Button } from '@/components/ui/button';
import { useCompanyContext } from '@/context/CompanyContext';
import useSEO from '@/hooks/use-seo';
import { useState } from 'react';

export default function ManageCompanies() {
	useSEO({
		title: 'Compañías | Contapp',
		description:
			'Gestiona tus compañías en Contapp, la solución para gestionar operaciones contables, balances y plan de cuentas.',
		keywords:
			'contapp, gestionar, operaciones, balances, plan de cuentas, compañías',
	});

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
			<CompanyModalMutate open={creationOpen} setOpen={setCreationOpen} />
		</div>
	);
}
