// Este componente gestiona la creación, edición y listado de asientos contables de forma dinámica y reutilizable.
// Para hacerlo dinámico, acepta props para manejar la lógica y datos externos.

'use client';

import { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export interface AccountingEntry {
  id: string;
  company_id: string | undefined;
  description: string;
  destination: 'Debe' | 'Haber';
  entry_date: string;
  entries: AccountingItem[];
}

export interface AccountingItem {
  id: string;
  account: string;
  debit: number;
  credit: number;
}

interface AccountingPageProps {
  companyId: string | undefined;
  accountsPlan: { id: string; nomenclature: string; name: string }[];
  initialEntries?: AccountingEntry[];
  onSave: (entry: AccountingEntry) => void;
  onDelete: (id: string) => void;
}

export default function AccountingPage({
  companyId,
  accountsPlan,
  initialEntries = [],
  onSave,
  onDelete,
}: AccountingPageProps) {
  const [entries, setEntries] = useState<AccountingEntry[]>(initialEntries);
  const [editingEntry, setEditingEntry] = useState<AccountingEntry | null>(null);
  const [sortConfig, setSortConfig] = useState<{ key: keyof AccountingEntry | ''; direction: 'asc' | 'desc' }>({ key: '', direction: 'asc' });
  const [expandedRows, setExpandedRows] = useState<string[]>([]);

  const [formData, setFormData] = useState<AccountingEntry>({
    id: '',
    company_id: companyId,
    description: '',
    destination: 'Debe',
    entry_date: new Date().toISOString().split('T')[0],
    entries: [],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addItem = () => {
    setFormData((prev) => ({
      ...prev,
      entries: [...prev.entries, { id: Date.now().toString(), account: '', debit: 0, credit: 0 }],
    }));
  };

  const updateItem = (index: number, field: keyof AccountingItem, value: string | number) => {
    setFormData((prev) => {
      const updatedEntries = [...prev.entries];
      updatedEntries[index] = { ...updatedEntries[index], [field]: value };
      return { ...prev, entries: updatedEntries };
    });
  };

  const removeItem = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      entries: prev.entries.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingEntry) {
      setEntries((prev) => prev.map((entry) => (entry.id === editingEntry.id ? formData : entry)));
    } else {
      setEntries((prev) => [...prev, formData]);
      onSave({ ...formData, id: Date.now().toString() });
    }
    resetForm();
  };

  const resetForm = () => {
    setEditingEntry(null);
    setFormData({
      id: '',
      company_id: companyId,
      description: '',
      destination: 'Debe',
      entry_date: new Date().toISOString().split('T')[0],
      entries: [],
    });
  };

  const handleDelete = (id: string) => {
    setEntries((prev) => prev.filter((entry) => entry.id !== id));
    onDelete(id);
  }

  const handleEdit = (id: string) => {
    const entryToEdit = entries.find((entry) => entry.id === id);
    if (entryToEdit) {
      setEditingEntry(entryToEdit);
      setFormData(entryToEdit);
    }
  };

  const handleSort = (key: keyof AccountingEntry) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const sortedEntries = useMemo(() => {
    if (!sortConfig.key) return entries;

    return [...entries].sort((a, b) => {
      if (sortConfig.key && a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (sortConfig.key && a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [entries, sortConfig]);

  const toggleRowExpansion = (id: string) => {
    setExpandedRows((prev) => (prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]));
  };

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
                name="entry_date"
                value={formData.entry_date}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-12 gap-4 font-medium text-sm text-gray-700">
              <div className="col-span-6">Cuenta</div>
              <div className="col-span-2">Debe</div>
              <div className="col-span-2">Haber</div>
              <div className="col-span-2"></div>
            </div>

            {formData.entries.map((item, index) => (
              <div key={item.id} className="grid grid-cols-12 gap-4">
                <div className="col-span-6">
                  <Select value={item.account} onValueChange={(value) => updateItem(index, 'account', value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecciona un Plan de Cuenta" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Planes</SelectLabel>
                        {accountsPlan.map((account) => (
                          <SelectItem key={account.id} value={account.id}>
                            {account.nomenclature} - {account.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>                     
                </div>
                <div className="col-span-2">
                  <input
                    type="number"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={item.debit}
                    onChange={(e) => updateItem(index, 'debit', parseFloat(e.target.value))}
                    placeholder="0.00"
                  />
                </div>
                <div className="col-span-2">
                  <input
                    type="number"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={item.credit}
                    onChange={(e) => updateItem(index, 'credit', parseFloat(e.target.value))}
                    placeholder="0.00"
                  />
                </div>
                <div className="col-span-2">
                  <button
                    type="button"
                    className="px-3 py-2 text-red-600 hover:text-red-900"
                    onClick={() => removeItem(index)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={addItem}
            >
              Agregar línea
            </button>
            <div>
              {editingEntry && (
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-2"
                  onClick={resetForm}
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
                  const debitTotal = entry.entries.reduce((sum, item) => sum + item.debit, 0);
                  const creditTotal = entry.entries.reduce((sum, item) => sum + item.credit, 0);
                  const isExpanded = expandedRows.includes(entry.id);
                return (
                    <>
                      <tr key={entry.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button onClick={() => toggleRowExpansion(entry.id)} className="text-black">
                            {isExpanded ? '▼' : '►'}
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {entry.description}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${debitTotal.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${creditTotal.toFixed(2)}
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
                      {isExpanded && (
                        <tr>
                          <td colSpan={5}>
                            <div className="px-6 py-4 bg-gray-50">
                              <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-100">
                                  <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cuenta</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Debe</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Haber</th>
                                  </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                  {entry.entries.map((item, index) => (
                                    <tr key={index}>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.account}</td>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${item.debit.toFixed(2)}</td>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${item.credit.toFixed(2)}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
