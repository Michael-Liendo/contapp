import { cn } from '@/lib/utils';
import { formatCurrencyValue } from '@/utils/formatCurrencyValue';

export function TotalizingHeader({
	totalDebit,
	totalCredit,
	entries,
}: {
	entries?: { debit: number; credit: number }[];
	totalDebit?: number;
	totalCredit?: number;
}) {
	const entriesTotalDebit =
		entries?.reduce((acc, entry) => {
			return acc + entry.debit;
		}, 0) || 0;
	const entriesTotalCredit =
		entries?.reduce((acc, entry) => {
			return acc + entry.credit;
		}, 0) || 0;

	const finalTotalDebit = totalDebit || entriesTotalDebit;
	const finalTotalCredit = totalCredit || entriesTotalCredit;
	return (
		<div className='flex items-center mt-3 space-x-3'>
			<div>
				<span className='font-semibold mr-3'>Total debe:</span>
				<span
					className={cn('text-xl font-bold text-primary', {
						'text-red-500': finalTotalCredit !== finalTotalDebit,
					})}
				>
					{formatCurrencyValue(finalTotalDebit)}
				</span>
			</div>
			<div>
				<span className='font-semibold mr-3'>Total haber:</span>
				<span
					className={cn('text-xl font-bold text-primary', {
						'text-red-500': finalTotalCredit !== finalTotalDebit,
					})}
				>
					{formatCurrencyValue(finalTotalCredit)}
				</span>
			</div>
		</div>
	);
}
