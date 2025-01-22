import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AutocompleteSelect } from "./AutoCompleteSelect"
import type { RowData, ColumnConfig } from "./types/datatable"
import { Check, X } from "lucide-react"

interface EditableRowProps {
  rowData: RowData
  columns: ColumnConfig[]
  allData: RowData[]
  onSave: (newData: RowData) => void
  onCancel: () => void
}

export function EditableRow({ rowData, columns, allData, onSave, onCancel }: EditableRowProps) {
  const [editedData, setEditedData] = useState<RowData>(rowData)

  useEffect(() => {
    setEditedData(rowData)
  }, [rowData])

  const handleInputChange = (key: string, value: string | number) => {
    setEditedData((prev) => ({ ...prev, [key]: value }))
  }

  const handleAutocompleteSelect = (selectedData: RowData) => {
    setEditedData(selectedData)
  }

  useEffect(() => {
    console.log(columns[0].options)
  }, [columns])

  return (
    <tr>
      {columns.map((column) => (
        <td key={column.key} className="p-2">
          {column.editable ? (
            column.type === "select" ? (
              <Select
                value={editedData[column.key].toString()}
                onValueChange={(value) => handleInputChange(column.key, value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar..." />
                </SelectTrigger>
                <SelectContent>
                  {column.options?.map((option, index) => (
                    <SelectItem key={index} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : column.type === "autocomplete-select" ? (
              <AutocompleteSelect
                options={allData}
                onSelect={(selected) => handleInputChange(column.key, selected[column.key])}
                placeholder="Seleccionar..."
                value={editedData[column.key].toString()}
              />
            ) : (
              <Input
                type={column.type}
                value={editedData[column.key].toString()}
                onChange={(e) => handleInputChange(column.key, e.target.value)}
                className="w-full"
              />
            )
          ) : (
            editedData[column.key]
          )}
        </td>
      ))}
      <td className="p-2">
        <Button onClick={() => onSave(editedData)} variant="ghost" className="size-[40px] p-0">
          <Check />
        </Button>
        <Button onClick={onCancel} variant="ghost" className="size-[40px] p-0">
          <X />
        </Button>
      </td>
    </tr>
  )
}

