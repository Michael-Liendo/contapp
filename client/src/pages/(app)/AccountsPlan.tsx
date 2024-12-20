import { AccountPlanDatagrid } from '@/components/table/accounts-plan/datagrid';
import { DataTable } from '@/components/table/data-table';
import { useCompanyContext } from '@/context/CompanyContext';
import Services from '@/services';
import type { IAccountPlan, IPaginationResponse } from '@contapp/shared';
import { useEffect, useState } from 'react';

export default function AccountsPlan() {
	const { activeCompany } = useCompanyContext();

	const [accountsPlan, setAccountsPlan] = useState<IAccountPlan[]>([]);
	const [pagination, setPagination] = useState<IPaginationResponse>();
	const [loading, setLoading] = useState(false);

	const [pageIndex, setPageIndex] = useState(0);

	useEffect(() => {
		const getAccountsPlan = async () => {
			if (!activeCompany?.id) return;

			setLoading(true);
			const plans = await Services.accountPlan.findAll(activeCompany.id, {
				page: pageIndex,
				limit: 10,
			});
			setAccountsPlan(plans.data);
			setPagination(plans.pagination);
			setLoading(false);
		};
		getAccountsPlan();
	}, [activeCompany, pageIndex]);

	return (
		<div>
			<h1 className='text-xl mb-5'>Plan de cuentas</h1>

			<DataTable
				pagination={pagination}
				columns={AccountPlanDatagrid}
				data={accountsPlan}
				loading={loading}
				onPageChange={(page) => {
					setPageIndex(page);
				}}
			/>
		</div>
	);
}
