import type { ITrialBalance } from '@contapp/shared';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useRef } from 'react';
import { Button } from '../ui/button';

export default function TrialBalanceTable({ data }: { data: ITrialBalance[] }) {
	const tableRef = useRef<HTMLTableElement>(null);
	const totalDebits = data.reduce((acc, item) => acc + item.debits, 0);
	const totalCredits = data.reduce((acc, item) => acc + item.credits, 0);
	const totalInitial = data.reduce(
		(acc, item) => acc + item.initial_balance,
		0,
	);
	const totalFinal = data.reduce((acc, item) => acc + item.final_balance, 0);

	// Función para exportar a Excel
	/* const exportToExcel = () => {
		const ws = XLSX.utils.table_to_sheet(tableRef.current);
		const wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, 'Balance de Comprobación');
		XLSX.writeFile(wb, 'balance-de-comprobacion.xlsx');
	}; */

	// Función para exportar a PDF
	const exportToPDF = () => {
		const doc = new jsPDF();
		doc.text('Balance de Comprobación', 14, 10);

		const tableData = data.map((trial) => [
			trial.account_plan.nomenclature,
			trial.account_plan.name,
			trial.initial_balance.toFixed(2),
			trial.debits.toFixed(2),
			trial.credits.toFixed(2),
			trial.final_balance.toFixed(2),
		]);

		// Agregar totales a la tabla
		tableData.push([
			'Totales:',
			'',
			totalInitial.toFixed(2),
			totalDebits.toFixed(2),
			totalCredits.toFixed(2),
			totalFinal.toFixed(2),
		]);

		autoTable(doc, {
			head: [
				['Nro', 'Cuentas', 'Saldo Inicial', 'Debe', 'Haber', 'Saldo Final'],
			],
			body: tableData,
			startY: 20,
		});

		doc.save('balance-de-comprobacion.pdf');
	};
	return (
		<div className='w-full mt-10'>
			<div className='flex gap-4 mb-4 justify-end'>
				<Button
					// onClick={exportToExcel}
					className='bg-green-500 hover:bg-green-600'
				>
					Exportar a Excel
				</Button>
				<Button onClick={exportToPDF} className='bg-blue-500 hover:bg-blue-600'>
					Exportar a PDF
				</Button>
			</div>
			<div className='overflow-x-auto'>
				<table
					ref={tableRef}
					className='w-full border-collapse border border-gray-300 '
				>
					<thead>
						<tr>
							<th className='border border-gray-300 px-4 py-2 w-[10%]'>Nro</th>
							<th className='border border-gray-300 px-4 py-2 w-[20%]'>
								Cuentas
							</th>
							<th className='border border-gray-300 px-4 py-2 w-[20%]'>
								Saldo inicial
							</th>
							<th className='border border-gray-300 px-4 py-2 w-[20%]'>Debe</th>
							<th className='border border-gray-300 px-4 py-2 w-[20%]'>
								Haber
							</th>
							<th className='border border-gray-300 px-4 py-2 w-[20%]'>
								Saldo final
							</th>
						</tr>
					</thead>
					<tbody>
						{data.map((trial) => {
							return (
								<tr key={trial.account_plan.id}>
									<td className='border border-gray-300 px-4 py-2 text-center'>
										{trial.account_plan.nomenclature}
									</td>
									<td className='border border-gray-300 px-4 py-2 text-center'>
										{trial.account_plan.name}
									</td>
									<td className='border border-gray-300 px-4 py-2 text-right'>
										{trial.initial_balance}
									</td>
									<td className='border border-gray-300 px-4 py-2 text-right'>
										{trial.debits}
									</td>
									<td className='border border-gray-300 px-4 py-2 text-right'>
										{trial.credits}
									</td>
									<td className='border border-gray-300 px-4 py-2 text-right'>
										{trial.final_balance}
									</td>
								</tr>
							);
						})}

						<tr className='font-bold'>
							<td
								className='border border-gray-300 px-4 py-2 text-center'
								colSpan={2}
							>
								<span>Totales:</span>
							</td>
							<td className='border border-gray-300 px-4 py-2 text-right'>
								{totalInitial}
							</td>
							<td className='border border-gray-300 px-4 py-2 text-right'>
								{totalDebits}
							</td>
							<td className='border border-gray-300 px-4 py-2 text-right'>
								{totalCredits}
							</td>
							<td className='border border-gray-300 px-4 py-2 text-right'>
								{totalFinal}
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
}
