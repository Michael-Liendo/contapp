'use client'

import AccountingPage from "@/components/journals/create-form"
import { useQuery } from "react-query"
import Services from "@/services"
import { useCompanyContext } from "@/context/CompanyContext"

export default function CreatePage() {

  const { activeCompany } = useCompanyContext();
  
  const saveSeat = () => {
    //endpoint here.
  }

  const deleteSeat = () => {
    //endpoint here.
  }

  const updateSeat = () => {
    //endpoint here.
  }

  const { data, isLoading } = useQuery(
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


  return <AccountingPage accountsPlan={data} onSave={saveSeat} onDelete={deleteSeat} onUpdate={updateSeat}/>
}

