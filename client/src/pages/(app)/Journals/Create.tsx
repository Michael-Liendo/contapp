'use client'

import { useState, useMemo } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useQuery } from 'react-query'
import Services from '@/services'
import { useCompanyContext } from '@/context/CompanyContext'

export interface AccountingEntry {
  id: string
  account?: string
  description: string
  destination: 'Debe' | 'Haber'
  date: string
}

const initialMockEntries: AccountingEntry[] = [
  {
    id: '1',
    description: 'Venta de mercancía',
    destination: 'Haber',
    date: '2023-06-01'
  },
  {
    id: '2',
    description: 'Compra de suministros',
    destination: 'Debe',
    date: '2023-06-02'
  },
  {
    id: '3',
    description: 'Pago de salarios',
    destination: 'Debe',
    date: '2023-06-03'
  }
]

export default function AccountingPage() {
  const { activeCompany } = useCompanyContext();
  const [entries, setEntries] = useState<AccountingEntry[]>(initialMockEntries)
  const [editingEntry, setEditingEntry] = useState<AccountingEntry | null>(null)
  const [sortConfig, setSortConfig] = useState<{
    key: keyof AccountingEntry | '',
    direction: 'asc' | 'desc'
  }>({ key: '', direction: 'asc' })

  const [formData, setFormData] = useState<AccountingEntry>({
    id: '',
    description: '',
    destination: 'Debe',
    date: new Date().toISOString().split('T')[0],
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingEntry) {
      setEntries(prev => prev.map(entry => entry.id === editingEntry.id ? formData : entry))
    } else {
      setEntries(prev => [...prev, { ...formData, id: Date.now().toString() }])
    }
    setEditingEntry(null)
    setFormData({
      id: '',
      description: '',
      destination: 'Debe',
      date: new Date().toISOString().split('T')[0],
    })
  }

  const handleEdit = (id: string) => {
    const entryToEdit = entries.find(entry => entry.id === id)
    if (entryToEdit) {
      setEditingEntry(entryToEdit)
      setFormData(entryToEdit)
    }
  }

  const handleDelete = (id: string) => {
    setEntries(prev => prev.filter(entry => entry.id !== id))
  }

  const handleSort = (key: keyof AccountingEntry) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
    })
  }

  const sortedEntries = useMemo(() => {
    if (!sortConfig.key) return entries

    return [...entries].sort((a, b) => {
      if (sortConfig.key && a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1
      }
      if (sortConfig.key && a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1
      }
      return 0
    })
  }, [entries, sortConfig])

  const { data, isLoading } = useQuery(
    ['accounts-plan', activeCompany],
    async () => {
        const data = await Services.accountsPlan.findAll(
            activeCompany?.id ?? ''
        );
        console.log(data.data);
        return data.data;
    },
    {
        enabled: !!activeCompany?.id,
    },
  );

  return (
    <div className="container mx-auto py-10 space-y-8">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-2xl font-bold mb-6">
          {editingEntry ? 'Editar Asiento Contable' : 'Nuevo Asiento Contable'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Descripción</label>
              <input
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Descripción del asiento contable"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Destino</label>
              <select
                name="destination"
                value={formData.destination}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Debe">Debe</option>
                <option value="Haber">Haber</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Fecha del asiento</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex justify-between">
            <></>
            <div>
              {editingEntry && (
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-2"
                  onClick={() => {
                    setEditingEntry(null)
                    setFormData({
                      id: '',
                      description: '',
                      destination: 'Debe',
                      date: new Date().toISOString().split('T')[0],
                    })
                  }}
                >
                  Cancelar
                </button>
              )}
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {editingEntry ? 'Actualizar' : 'Guardar'} asiento contable
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-2xl font-bold mb-6">Asientos Contables</h2>
        <div className="space-y-4">
          <div className="overflow-x-auto rounded-lg border">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cuenta
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('description')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Descripción</span>
                      {sortConfig.key === 'description' && (
                        sortConfig.direction === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Debe Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Haber Total
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedEntries.map((entry) => {

                return (
                  <tr key={entry.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" defaultValue={0}>
                        <option value={0}>{isLoading ? 'Cargando...' : 'Selecciona un Plan de Cuenta'}</option>
                        {!isLoading && data && (
                          data.map((item) => (
                            <option key={item.id} value={item.id}>{item.name}</option>
                          ))
                        )}
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {entry.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      0
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      0
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit(entry.id)}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(entry.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

