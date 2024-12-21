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
import { type ReactNode, useState } from 'react';
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
	EditModal?: ({
		open,
		setOpen,
		isEdit,
	}: {
		open: boolean;
		setOpen: (open: boolean) => void;
		isEdit?: TData | undefined;
	}) => JSX.Element;
	canDelete?: boolean;
}

export function DataTableRowActions<TData>({
	row,
	masterName,
	EditModal,
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
					{EditModal && (
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
			{EditModal && (
				<EditModal
					open={openEdit}
					setOpen={setOpenEdit}
					isEdit={row.original}
					key={row.id}
				/>
			)}
		</>
	);
}
