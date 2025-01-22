'use client';

import { useEffect, useState } from 'react';
import { DynamicDataTable } from '../datatable/DynamicDatatable';
import { RowData, TableConfig } from '../datatable/types/datatable';
import { useQuery } from 'react-query';
import { useCompanyContext } from '@/context/CompanyContext';
import Services from '@/services';
import { Button } from '../ui/button';

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

export default function AccountingPage({companyId, onSave}: AccountingPageProps) {
  const [editingEntry, setEditingEntry] = useState<AccountingEntry | null>(null);
  const { activeCompany } = useCompanyContext();

  const [formData, setFormData] = useState<AccountingEntry>({
    id: '',
    company_id: companyId,
    description: '',
    destination: 'Debe',
    entry_date: new Date().toISOString().split('T')[0],
    entries: [],
  });

  const [tableConfig, setTableConfig] = useState<TableConfig>({
    columns: [
      {
        key: "id",
        label: "Cuenta",
        editable: true,
        type: "select",
        options: [] as { value: string; label: string }[],
      },
      { key: "debit", label: "Debe Total", editable: true, type: "number" },
      { key: "credit", label: "Haber Total", editable: true, type: "number" },
    ],
    primaryField: "id",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingEntry) {
      // setEntries((prev) => prev.map((entry) => (entry.id === editingEntry.id ? formData : entry)));
    } else {
      // setEntries((prev) => [...prev, formData]);
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

  const { data } = useQuery(
    ['accounts-plan', activeCompany],
    async () => {
        const data = await Services.accountsPlan.findAll(
            activeCompany?.id ?? ''
        );
        return data.data;
    },
    {
        enabled: !!activeCompany?.id,
    },
  );

  useEffect(() => {
    if (data) {
      const updatedConfig = { ...tableConfig }
      updatedConfig.columns[0].options = data.map((account: any) => ({
        value: account.id,
        label: `${account.nomenclature} - ${account.name}`,
      }))
      setTableConfig(updatedConfig)
    }
  }, [data])

  return (
    <div className="">
      <div className="mb-4">
        <div className='flex flex-row justify-between'>
          <h4 className="text-xl mb-6">{editingEntry ? 'Editar Asiento Contable' : 'Nuevo Asiento Contable'}</h4>
          <div>
            <Button onClick={handleSubmit} className="w-full" variant="default" color='#000'>Crear</Button>
          </div>
        </div>
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
        </form>
      </div>
      <DynamicDataTable config={tableConfig} initialData={[]}/>
    </div>
  );
}
