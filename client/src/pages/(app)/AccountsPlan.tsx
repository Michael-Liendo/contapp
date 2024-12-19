import { AccountPlanDatagrid } from '@/components/table/accounts-plan/datagrid';
import { DataTable } from '@/components/table/data-table';
import { useCompanyContext } from '@/context/CompanyContext';
import Services from '@/services';
import type { IAccountPlan } from '@contapp/shared';
import { useEffect, useState } from 'react';

export default function AccountsPlan() {
	const { activeCompany } = useCompanyContext();

	const [accountsPlan, setAccountsPlan] = useState<IAccountPlan[]>([]);
	const [loading, setLoading] = useState(true);
	const [pageIndex, setPageIndex] = useState(0);

	useEffect(() => {
		const getAccountsPlan = async () => {
			if (!activeCompany?.id) return;

			setLoading(true);
			const plans = await Services.accountPlan.findAll(activeCompany.id, {
				page: pageIndex + 1,
			});
			setAccountsPlan(plans);
			setLoading(false);
		};
		getAccountsPlan();
	}, [activeCompany, pageIndex]);

	return (
		<div className='flex flex-1 flex-col gap-4 p-4 pt-0'>
			<h1>Plan de cuentas</h1>

			<DataTable
				columns={AccountPlanDatagrid}
				data={accountsPlan}
				loading={loading}
				onPageChange={setPageIndex}
				pageIndex={pageIndex}
			/>
		</div>
	);
}
