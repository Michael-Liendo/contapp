import { useCompanyContext } from '@/context/CompanyContext';
import Services from '@/services';
import { useQuery } from 'react-query';
import { useState } from 'react';
import { DatePickerWithRange } from '@/components/ui/date-picker-with-range';
import { addDays } from 'date-fns';
import type { DateRange } from 'react-day-picker';

export default function TrialBalance() {
	// Obtención del company_id desde el contexto
	const { activeCompany } = useCompanyContext();

	// Estados para las fechas de inicio y fin
	const [dateRange, setDateRange] = useState<DateRange | undefined>({
		from: new Date(2022, 0, 20),
		to: addDays(new Date(2022, 0, 20), 20),
	});

	// Hook de React Query para obtener los datos del balance de comprobación
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
				start_date: dateRange?.from || new Date(),
				end_date: dateRange?.to || new Date(),
			}),
		enabled: !!dateRange?.from && !!dateRange.to,
	});

	// Si está cargando o hay un error, mostramos un mensaje
	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error: {String(error)}</div>;

	return (
		<div>
			{/* Formulario para seleccionar el rango de fechas */}
			<DatePickerWithRange
				date={dateRange}
				setDate={(date) => setDateRange(date)}
			/>

			{/* Si los datos existen, mostrar la tabla */}
			{data && data.length > 0 ? (
				<table>
					<thead>
						<tr>
							<th>Account Name</th>
							<th>Initial Balance</th>
							<th>Debits</th>
							<th>Credits</th>
							<th>Final Balance</th>
						</tr>
					</thead>
					<tbody>
						{data.map((trial) => (
							<tr key={trial.account_plan.id}>
								<td>{trial.account_plan.name}</td>
								<td>{trial.initial_balance}</td>
								<td>{trial.debits}</td>
								<td>{trial.credits}</td>
								<td>{trial.final_balance}</td>
							</tr>
						))}
					</tbody>
				</table>
			) : (
				<div>No data available for the selected period.</div>
			)}
		</div>
	);
}
