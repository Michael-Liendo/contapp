'use client';

import { Button } from '@/components/ui/button';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import * as React from 'react';
import type { RowData } from './types/datatable';

/**
 * Propiedades que acepta el componente AutocompleteSelect.
 */
interface AutocompleteSelectProps {
	/** Lista de opciones para seleccionar. */
	options: RowData[];
	/** Función que se ejecuta al seleccionar un valor. */
	onSelect: (value: RowData) => void;
	/** Placeholder que se muestra cuando no hay un valor seleccionado. */
	placeholder: string;
	/** Valor actualmente seleccionado. */
	value: string;
}

/**
 * Componente de selección con autocompletado que permite elegir opciones de una lista desplegable.
 */
export function AutocompleteSelect({
	options,
	onSelect,
	placeholder,
	value,
}: AutocompleteSelectProps) {
	const [open, setOpen] = React.useState(false); // Estado para manejar la apertura del menú desplegable

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant='outline'
					role='combobox'
					aria-expanded={open}
					className='w-full justify-between'
				>
					{value || placeholder}
					<ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-full p-0'>
				<Command>
					<CommandInput placeholder='Buscar...' />
					<CommandList>
						<CommandEmpty>No se encontraron opciones.</CommandEmpty>
						<CommandGroup>
							{options.map((option) => (
								<CommandItem
									key={option[Object.keys(option)[0]]}
									onSelect={() => {
										onSelect(option);
										setOpen(false);
									}}
								>
									<Check
										className={cn(
											'mr-2 h-4 w-4',
											value === option[Object.keys(option)[0]]
												? 'opacity-100'
												: 'opacity-0',
										)}
									/>
									{option[Object.keys(option)[0]]}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
