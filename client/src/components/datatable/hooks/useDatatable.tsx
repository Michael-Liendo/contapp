import { useState, useCallback } from "react"
import type { RowData, TableConfig } from "../types/datatable"

export function useDataTable(initialData: RowData[], config?: TableConfig) {
  const [data, setData] = useState<RowData[]>(initialData)
  const [editingRow, setEditingRow] = useState<number | null>(null)

  const handleEdit = useCallback((index: number | null) => {
    setEditingRow(index)
  }, [])

  const handleSave = useCallback((index: number, newData: RowData) => {
    setData((prevData) => {
      const newDataArray = [...prevData]
      if (index === prevData.length) {
        // Adding a new row
        newDataArray.push(newData)
      } else {
        // Updating an existing row
        newDataArray[index] = newData
      }
      return newDataArray
    })
    setEditingRow(null)
  }, [])

  const handleDelete = useCallback((index: number) => {
    setData((prevData) => prevData.filter((_, i) => i !== index))
  }, [])

  const handleAutocomplete = useCallback(
    (value: string) => {
      if (!config || !config.primaryField) return []
      const primaryField = config.primaryField
      return data.filter((row) => row[primaryField].toString().toLowerCase().includes(value.toLowerCase()))
    },
    [data, config],
  )

  return {
    data,
    editingRow,
    handleEdit,
    handleSave,
    handleDelete,
    handleAutocomplete,
  }
}

