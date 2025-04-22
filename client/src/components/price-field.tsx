import { formatCurrencyValue } from '@/utils/formatCurrencyValue';
import { useState } from 'react';
import { Input } from './ui/input';

function parseFormattedPrice(value: string): number {
	// Remueve los puntos de miles y reemplaza la coma decimal
	const cleanValue = value.replace(/\./g, '').replace(',', '.');
	return Number.parseFloat(cleanValue) || 0;
}

export default function PriceInput({
	value,
	onChange,
}: {
	value: number;
	onChange: (val: number) => void;
}) {
	const [inputValue, setInputValue] = useState(formatCurrencyValue(value));

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const raw = e.target.value;
		setInputValue(raw);

		const parsed = parseFormattedPrice(raw);
		onChange(parsed);
	};

	const handleBlur = () => {
		const parsed = parseFormattedPrice(inputValue);
		setInputValue(formatCurrencyValue(parsed));
	};

	return (
		<Input
			type='text'
			inputMode='decimal'
			value={inputValue}
			onChange={handleChange}
			onBlur={handleBlur}
			className='w-full'
		/>
	);
}
