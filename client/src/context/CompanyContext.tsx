import useAuth from '@/hooks/useAuth';
import Services from '@/services';
import type {
	ICompany,
	ICompanyForCreate,
	ICompanyForUpdate,
} from '@contapp/shared';
import { type ReactNode, createContext, useContext, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

interface CompanyContextType {
	companies: ICompany[];
	activeCompany: ICompany | undefined;
	setActiveCompany: (company: ICompany) => void;
	create: (company: ICompanyForCreate) => void;
	remove: (id: string) => void;
	update: (company: ICompanyForUpdate) => void;
}

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

const CompanyProvider = ({ children }: { children: ReactNode }) => {
	const { user } = useAuth();
	const [activeCompany, setActiveCompany] = useState<ICompany | undefined>();

	const queryClient = useQueryClient();
	const { data } = useQuery(
		['company'],
		async () => {
			if (!user) return;
			const data = await Services.companies.findAll();
			return data;
		},
		{
			onSuccess: (data) => {
				setActiveCompany(data?.data?.[0]);
			},
		},
	);

	const create = useMutation({
		mutationFn: (company: ICompanyForCreate) => {
			return Services.companies.create(company);
		},
		onSuccess: () => {
			queryClient.invalidateQueries('company');
		},
	});

	const update = useMutation({
		mutationFn: (company: ICompanyForUpdate) => {
			return Services.companies.update(company);
		},
		onSuccess: () => {
			queryClient.invalidateQueries('company');
		},
	});

	const remove = useMutation({
		mutationFn: (id: string) => {
			return Services.companies.remove(id);
		},
		onSuccess: () => {
			queryClient.invalidateQueries('company');
		},
	});

	async function createHandle(company: ICompanyForCreate) {
		create.mutate(company);
	}

	async function removeHandle(id: string) {
		remove.mutate(id);
	}

	async function updateHandle(company: ICompanyForUpdate) {
		update.mutate(company);
	}

	return (
		<CompanyContext.Provider
			value={{
				companies: data?.data || [],
				activeCompany,
				setActiveCompany,
				create: createHandle,
				remove: removeHandle,
				update: updateHandle,
			}}
		>
			{children}
		</CompanyContext.Provider>
	);
};

// Custom hook to use the CompanyContext
const useCompanyContext = () => {
	const context = useContext(CompanyContext);
	if (context === undefined) {
		throw new Error('useCompanyContext must be used within a CompanyProvider');
	}
	return context;
};

export { CompanyProvider, useCompanyContext };
