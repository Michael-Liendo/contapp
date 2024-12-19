import { DataTable } from '@/components/data-table';
import { AccountPlanDatagrid } from '@/components/table/accounts-plan/datagrid';
import { useCompanyContext } from '@/context/CompanyContext';
import Services from '@/services';
import type { IAccountPlan } from '@contapp/shared';
import { useEffect, useState } from 'react';

export default function AccountsPlan() {
	const { activeCompany } = useCompanyContext();

	const [AccountsPlan, setAccountsPlan] = useState<IAccountPlan[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const getAccountsPlan = async () => {
			if (!activeCompany?.id) return;

			setLoading(true);
			const accountsPlan = await Services.accountPlan.findAll(activeCompany.id);
			setAccountsPlan(accountsPlan);
			setLoading(false);
		};
		getAccountsPlan();
	}, [activeCompany]);

	return (
		<div className='flex flex-1 flex-col gap-4 p-4 pt-0'>
			<h1>Plan de cuentas</h1>

			<DataTable
				columns={AccountPlanDatagrid}
				data={AccountsPlan}
				loading={loading}
			/>
		</div>
	);
}
