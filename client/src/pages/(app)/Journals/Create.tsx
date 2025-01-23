'use client';

import { DynamicDataTable } from '@/components/datatable/DynamicDatatable';
import { useDataTable } from '@/components/datatable/hooks/useDatatable';
import type { TableConfig } from '@/components/datatable/types/datatable';
import { Button } from '@/components/ui/button';
import { useCompanyContext } from '@/context/CompanyContext';
import Services from '@/services';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

/**
 * Interfaz que representa un asiento contable.
 */
export interface AccountingEntry {
  id: string;
  company_id: string | undefined;
  description: string;
  destination: 'Debe' | 'Haber';
  entry_date: string;
  entries: AccountingItem[];
}

/**
 * Interfaz que representa un ítem dentro de un asiento contable.
 */
export interface AccountingItem {
  id: string;
  account: string;
  debit: number;
  credit: number;
}

/**
 * Componente para crear o editar un asiento contable.
 */
export default function CreatePage() {
  // Estados
  const [editingEntry, setEditingEntry] = useState<AccountingEntry | null>(null); // Seguimiento del asiento que se está editando
  const { activeCompany } = useCompanyContext(); // Contexto para los datos de la empresa activa
  const [entries, setEntries] = useState<AccountingItem[]>([]); // Lista de ítems contables

  // Datos del formulario para crear o editar un asiento
  const [formData, setFormData] = useState<AccountingEntry>({
    id: '',
    company_id: activeCompany?.id,
    description: '',
    destination: 'Debe',
    entry_date: new Date().toISOString().split('T')[0],
    entries: [],
  });

  // Configuración para la tabla de datos
  const [tableConfig, setTableConfig] = useState<TableConfig>({
    columns: [
      {
        key: 'id',
        label: 'Cuenta',
        editable: true,
        type: 'select',
        options: [] as { value: string; label: string }[],
      },
      { key: 'debit', label: 'Debe Total', editable: true, type: 'number' },
      { key: 'credit', label: 'Haber Total', editable: true, type: 'number' },
    ],
    primaryField: 'id',
  });

  // Hook personalizado para manejar los datos de la tabla
  const {
	data,
	editingRow,
	handleEdit,
	handleSave,
	handleDelete,
  } = useDataTable([], tableConfig);

  /**
   * Actualiza el estado de los datos del formulario cuando cambian las entradas.
   */
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Maneja el envío de un nuevo asiento contable.
   */
  const handleChange = (data: any) => {
    setEntries((prev) => {
      const updatedEntries = [...prev, data];
      return updatedEntries;
    });
    resetForm();
  };

  /**
   * Envio de datos.
   */
  const handleSubmit = () => {

	const newData = {
		...formData,
		entries: data.map((entry: any) => {
			const { id, ...rest } = entry;
			return { ...rest, account_id: id };
		}),
	}
	// Logica de API.
	console.log(newData);
  }

  /**
   * Restaura el formulario a su estado inicial.
   */
  const resetForm = () => {
    setEditingEntry(null);
    setFormData({
      id: '',
      company_id: activeCompany?.id,
      description: '',
      destination: 'Debe',
      entry_date: new Date().toISOString().split('T')[0],
      entries: [],
    });
  };

  // Obtiene los datos de las cuentas para la empresa activa
  const { data: servicesData } = useQuery(
    ['accounts-plan', activeCompany],
    async () => {
      const data = await Services.accountsPlan.findAll(activeCompany?.id ?? '');
      return data.data;
    },
    {
      enabled: !!activeCompany?.id,
    }
  );

  // Actualiza la configuración de la tabla cuando se obtienen los datos de las cuentas
  useEffect(() => {
    if (servicesData) {
      const updatedConfig = { ...tableConfig };
      updatedConfig.columns[0].options = servicesData.map((account: any) => ({
        value: account.id,
        label: `${account.nomenclature} - ${account.name}`,
      }));
      setTableConfig(updatedConfig);
    }
  }, [servicesData]);

  useEffect(() => {
	console.log("Se actualizo data", data);
  }, [data]);

  // Renderizado
  return (
    <div>
      {/* Sección de encabezado */}
      <div className="mb-4">
        <div className="flex flex-row justify-between">
          <h4 className="text-xl mb-6">
            {editingEntry ? 'Editar Asiento Contable' : 'Nuevo Asiento Contable'}
          </h4>
          <div>
            <Button
              onClick={handleSubmit}
              className="w-full"
              variant="default"
              color="#000"
            >
              Crear
            </Button>
          </div>
        </div>

        {/* Sección del formulario */}
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Descripción
              </label>
              <input
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Descripción del asiento contable"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Destino
              </label>
              <select
                name="destination"
                value={formData.destination}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="DEBIT">Debe</option>
                <option value="CREDIT">Haber</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Fecha del asiento
              </label>
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

      {/* Sección de la tabla de datos */}
      <DynamicDataTable
        config={tableConfig}
        initialData={data}
        onChange={handleChange}
		editingRow={editingRow}
		handleEdit={handleEdit}
		handleSave={handleSave}
		handleDelete={handleDelete}
      />
    </div>
  );
}
