import Services from '@/services';
import type { ICompany, ICompanyForCreate } from '@contapp/shared';
import {
	type ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from 'react';

interface CompanyContextType {
	companies: ICompany[];
	activeCompany: ICompany | undefined;
	setActiveCompany: (company: ICompany) => void;
	create: (company: ICompanyForCreate) => void;
	removeCompany: (id: string) => void;
}

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

const CompanyProvider = ({ children }: { children: ReactNode }) => {
	const [loading, setLoading] = useState({
		create: false,
		remove: false,
		get: false,
	});
	const [companies, setCompanies] = useState<ICompany[]>([]);
	const [activeCompany, setActiveCompany] = useState<ICompany>(companies[1]);

	async function create(company: ICompanyForCreate) {
		try {
			setLoading({ ...loading, create: true });
			const newCompany = await Services.company.create(company);
			setCompanies((prevCompanies) => [...prevCompanies, newCompany]);
		} catch (e) {
			console.error(e);
		} finally {
			setLoading({ ...loading, create: false });
		}
	}

	async function removeCompany(id: string) {
		try {
			setLoading({ ...loading, remove: true });
			await Services.company.remove(id);
			setCompanies((prevCompanies) =>
				prevCompanies.filter((company) => company.id !== id),
			);
		} catch (e) {
			console.error(e);
		} finally {
			setLoading({ ...loading, remove: false });
		}
	}

	async function getCompanies() {
		try {
			setLoading({ ...loading, get: true });
			const companies = await Services.company.getAll();
			setCompanies(companies);
			setActiveCompany(companies[1]);
		} catch (e) {
			console.error(e);
		} finally {
			setLoading({ ...loading, get: false });
		}
	}

	useEffect(() => {
		getCompanies();
	}, []);

	return (
		<CompanyContext.Provider
			value={{
				companies,
				activeCompany,
				setActiveCompany,
				create,
				removeCompany,
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
