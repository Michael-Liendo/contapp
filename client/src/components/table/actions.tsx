'use client';

import { MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import Services from '@/services';
import type { Row } from '@tanstack/react-table';
import { useState } from 'react';
import { useQueryClient } from 'react-query';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '../ui/dialog';
import { useToast } from '../ui/use-toast';
import { DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu';

interface DataTableRowActionsProps<TData> {
	masterName: string;
	row: Row<TData & { id: string }>;
	canEdit?: boolean;
	canDelete?: boolean;
}

export function DataTableRowActions<TData>({
	row,
	masterName,
	canEdit = false,
	canDelete = true,
}: DataTableRowActionsProps<TData>) {
	const [openEdit, setOpenEdit] = useState(false);
	const [confirmDelete, setConfirmDelete] = useState(false);
	const { toast } = useToast();
	const queryClient = useQueryClient();

	async function handleDelete() {
		await Services.default.delete(masterName, row.original?.id);
		toast({
			title: 'Elemento eliminado',
		});
		queryClient.invalidateQueries(masterName);
		setConfirmDelete(false);
	}

	return (
		<>
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
					{canEdit && (
						<DropdownMenuItem onClick={() => setOpenEdit(true)}>
							Editar
						</DropdownMenuItem>
					)}
					<DropdownMenuSeparator />
					{canDelete && (
						<DropdownMenuItem onClick={() => setConfirmDelete(true)}>
							Eliminar
						</DropdownMenuItem>
					)}
				</DropdownMenuContent>
			</DropdownMenu>
			<Dialog
				open={confirmDelete}
				onOpenChange={(open) => setConfirmDelete(open)}
			>
				<DialogContent className='sm:max-w-[425px]'>
					<DialogHeader>
						<DialogTitle>Estas seguro que deseas eliminar?</DialogTitle>
						<DialogDescription>
							Esta acción no se puede deshacer.
						</DialogDescription>
					</DialogHeader>

					<DialogFooter>
						<Button
							variant={'destructive'}
							onClick={() => {
								handleDelete();
							}}
						>
							Eliminar
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
}
