'use client';

import { MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import Services from '@/services';
import type { Row } from '@tanstack/react-table';
import { useQueryClient } from 'react-query';
import { useToast } from '../ui/use-toast';

interface DataTableRowActionsProps<TData> {
	masterName: string;
	row: Row<TData & { id: string }>;
}

export function DataTableRowActions<TData>({
	row,
	masterName,
}: DataTableRowActionsProps<TData>) {
	const { toast } = useToast();
	const queryClient = useQueryClient();

	async function handleDelete() {
		await Services.default.delete(masterName, row.original?.id);
		toast({
			title: 'Elemento eliminado',
		});
		queryClient.invalidateQueries(masterName);
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant='ghost'
					className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
				>
					<MoreHorizontal />
					<span className='sr-only'>Open menu</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end' className='w-[160px]'>
				{/* <DropdownMenuItem>Editar</DropdownMenuItem> */}
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={() => handleDelete()}>
					Eliminar
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
