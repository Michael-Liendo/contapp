import Services from '@/services';
import type { ICompany, ICompanyForCreate } from '@contapp/shared';
import {
	type ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

interface CompanyContextType {
	companies: ICompany[];
	activeCompany: ICompany | undefined;
	setActiveCompany: (company: ICompany) => void;
	create: (company: ICompanyForCreate) => void;
	remove: (id: string) => void;
}

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

const CompanyProvider = ({ children }: { children: ReactNode }) => {
	const queryClient = useQueryClient();
	const { data } = useQuery(['company'], async () => {
		const data = await Services.company.findAll();
		return data;
	});

	const create = useMutation({
		mutationFn: (company: ICompanyForCreate) => {
			return Services.company.create(company);
		},
		onSuccess: () => {
			queryClient.invalidateQueries('company');
		},
	});

	const remove = useMutation({
		mutationFn: (id: string) => {
			return Services.company.remove(id);
		},
		onSuccess: () => {
			queryClient.invalidateQueries('company');
		},
	});

	const [activeCompany, setActiveCompany] = useState<ICompany | undefined>();

	useEffect(() => {
		setActiveCompany(data?.[0]);
	}, [data]);

	async function createHandle(company: ICompanyForCreate) {
		create.mutate(company);
	}

	async function removeHandle(id: string) {
		remove.mutate(id);
	}

	return (
		<CompanyContext.Provider
			value={{
				companies: data || [],
				activeCompany,
				setActiveCompany,
				create: createHandle,
				remove: removeHandle,
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
