import { NeedCompany } from '@/components/need-company';
import TrialBalanceTable from '@/components/reports/trialBalanceTable';
import { DatePickerWithRange } from '@/components/ui/date-picker-with-range';
import { useCompanyContext } from '@/context/CompanyContext';
import useSEO from '@/hooks/use-seo';
import Services from '@/services';
import { format, subDays } from 'date-fns';
import { useState } from 'react';
import type { DateRange } from 'react-day-picker';
import { useQuery } from 'react-query';

export default function TrialBalance() {
	useSEO({
		title: 'Balances de comprobación | Contapp',
		description:
			'Consulta y gestiona tu balance de comprobación en Contapp, la solución para gestionar operaciones contables, balances y plan de cuentas.',
		keywords:
			'contapp, gestionar, operaciones, balances, plan de cuentas, balance de comprobación',
	});
	const { activeCompany } = useCompanyContext();

	const [dateRange, setDateRange] = useState<DateRange | undefined>({
		from: subDays(new Date(), 30),
		to: new Date(),
	});

	const { data, isLoading, error } = useQuery({
		queryKey: [
			'reports/trial-balance',
			activeCompany,
			dateRange?.from,
			dateRange?.to,
		],
		queryFn: () =>
			Services.reports.trialBalance({
				company_id: activeCompany?.id || '',
				start_date: format(dateRange?.from ?? new Date(), 'yyyy-MM-dd'),
				end_date: format(dateRange?.to ?? new Date(), 'yyyy-MM-dd'),
			}),
		enabled: !!dateRange?.from && !!dateRange?.to && !!activeCompany,
	});

	if (!activeCompany?.id) return <NeedCompany />;

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error: {String(error)}</div>;

	return (
		<div>
			<h1 className='text-xl'>Balances de Comprobación</h1>
			<DatePickerWithRange
				date={dateRange}
				setDate={(date) => setDateRange(date)}
			/>

			{data && data.length > 0 ? (
				<TrialBalanceTable data={data} />
			) : (
				<div>No data available for the selected period.</div>
			)}
		</div>
	);
}
