import {
	type ColumnDef,
	type ColumnFiltersState,
	type SortingState,
	type VisibilityState,
	flexRender,
	getCoreRowModel,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';

import { cn } from '@/lib/utils';
import type { IPaginationResponse } from '@contapp/shared';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '../ui/table';
import { DataTablePagination } from './pagination';

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[] | undefined;
	loading?: boolean;
	pagination?: IPaginationResponse;
	route?: string;
	onPageChange?: (pageIndex: number) => void;
}

export function DataTable<TData, TValue>({
	columns,
	data,
	loading,
	route,
	pagination,
	onPageChange,
}: DataTableProps<TData, TValue>) {
	const navigate = useHistory();

	const [rowSelection, setRowSelection] = useState({});
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [sorting, setSorting] = useState<SortingState>([]);

	const table = useReactTable({
		data: data ?? [],
		columns,
		pageCount: pagination
			? Math.ceil(pagination?.total / pagination?.limit)
			: undefined,
		state: {
			sorting,
			columnVisibility,
			rowSelection,
			columnFilters,
			pagination: {
				pageIndex: pagination ? pagination.page : 0,
				pageSize: pagination ? pagination.limit : 10,
			},
		},
		manualPagination: true,
		onRowSelectionChange: setRowSelection,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		onColumnVisibilityChange: setColumnVisibility,
		onPaginationChange: (newPagination) => {
			if (pagination) {
				if (typeof newPagination === 'function') {
					onPageChange?.(
						newPagination({
							pageIndex: pagination.page,
							pageSize: pagination.limit,
						}).pageIndex,
					);
				} else {
					onPageChange?.(newPagination.pageIndex);
				}
			}
		},
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
	});

	function handleGoToRoute(id: string | undefined) {
		if (!id || !route) {
			console.warn('Row data id or route is undefined');
			return;
		}
		navigate.push(`${route}/${id}`);
	}

	return (
		<div className='space-y-4 w-full'>
			{/* <DataTableToolbar table={table} /> */}
			<div className='rounded-md border'>
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id} colSpan={header.colSpan}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext(),
													)}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{loading ? (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className='h-24 text-center'
								>
									Loading...
								</TableCell>
							</TableRow>
						) : table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => {
								const rowData = row.original as { id?: string };
								return (
									<>
										<TableRow
											key={row.id}
											onClick={() => {
												handleGoToRoute(rowData.id);
											}}
											className={cn({
												'cursor-pointer': !!route,
											})}
											data-state={row.getIsSelected() && 'selected'}
										>
											{row.getVisibleCells().map((cell) => (
												<TableCell key={cell.id}>
													{flexRender(
														cell.column.columnDef.cell,
														cell.getContext(),
													)}
												</TableCell>
											))}
										</TableRow>
									</>
								);
							})
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className='h-24 text-center'
								>
									Sin resultados.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			{pagination && <DataTablePagination table={table} />}
		</div>
	);
}
