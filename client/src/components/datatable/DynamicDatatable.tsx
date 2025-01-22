"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useDataTable } from "./hooks/useDatatable"
import { EditableRow } from "./EditableRow"
import type { RowData, TableConfig } from "./types/datatable"
import { Pencil, Trash2, Plus } from "lucide-react"

interface DynamicDataTableProps {
  initialData: RowData[]
  config: TableConfig | undefined
}

export function DynamicDataTable({ initialData, config }: DynamicDataTableProps) {
  const { data, editingRow, handleEdit, handleSave, handleDelete, handleAutocomplete } = useDataTable(
    initialData,
    config,
  )
  const [isCreatingNewRow, setIsCreatingNewRow] = useState(false)

  const handleCreateNewRow = () => {
    setIsCreatingNewRow(true)
    handleEdit(data.length)
  }

  const handleSaveNewRow = (newData: RowData) => {
    handleSave(data.length, newData)
    setIsCreatingNewRow(false)
  }

  const handleCancelNewRow = () => {
    setIsCreatingNewRow(false)
    handleEdit(null)
  }

  if (!config) {
    return <div>Error: No se ha proporcionado la configuración de la tabla.</div>
  }

  const emptyRow: RowData = Object.fromEntries(config.columns.map((col) => [col.key, ""]))

  const visibleColumns = config.columns

  return (
    <div className="space-y-4">
      <Table className="border-collapse border border-gray-200 rounded-lg">
        <TableHeader className="uppercase">
          <TableRow>
            {visibleColumns.map((column) => (
              <TableHead className="w-[445px]" key={column.key}>
                {column.label}
              </TableHead>
            ))}
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, index) =>
            editingRow === index ? (
              <EditableRow
                key={index}
                rowData={row}
                columns={config.columns}
                allData={data}
                onSave={(newData) => handleSave(index, newData)}
                onCancel={() => handleEdit(null)}
              />
            ) : (
              <TableRow key={index}>
                {visibleColumns.map((column) => (
                  <TableCell key={column.key}>{row[column.key]}</TableCell>
                ))}
                <TableCell>
                  <Button onClick={() => handleEdit(index)} variant="ghost" className="size-[40px] p-0">
                    <Pencil />
                  </Button>
                  <Button onClick={() => handleDelete(index)} variant="ghost" className="size-[40px] p-0">
                    <Trash2 />
                  </Button>
                </TableCell>
              </TableRow>
            ),
          )}
          {isCreatingNewRow ? (
            <EditableRow
              rowData={emptyRow}
              columns={config.columns}
              allData={data}
              onSave={handleSaveNewRow}
              onCancel={handleCancelNewRow}
            />
          ) : (
            <TableRow className="hover:bg-gray-100 cursor-pointer" onClick={handleCreateNewRow}>
              {visibleColumns.map((column, index) => (
                <TableCell key={index} className="text-gray-400">
                  {index === 0 ? "Haga clic para agregar una nueva fila" : ""}
                </TableCell>
              ))}
              <TableCell>
                
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

