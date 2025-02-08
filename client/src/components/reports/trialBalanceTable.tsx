import type { ITrialBalance } from '@contapp/shared';

export default function TrialBalanceTable({
	data,
}: {
	data: ITrialBalance[];
}) {
	const totalDebits = data.reduce((acc, item) => acc + item.debits, 0);
	const totalCredits = data.reduce((acc, item) => acc + item.credits, 0);
	const totalInitial = data.reduce(
		(acc, item) => acc + item.initial_balance,
		0,
	);
	const totalFinal = data.reduce((acc, item) => acc + item.final_balance, 0);

	return (
		<div className='w-full mt-10'>
			<div className='overflow-x-auto'>
				<table className='w-full border-collapse border border-gray-300 '>
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
