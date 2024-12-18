import Services from '@/services';
import type { ICompany } from '@contapp/shared';
import {
	createContext,
	useContext,
	useEffect,
	useState,
	type ReactNode,
} from 'react';

interface CompanyContextType {
	companies: ICompany[];
	create: (company: ICompany) => void;
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

	async function create(company: ICompany) {
		try {
			setLoading({ ...loading, create: true });
			const newCompany = await Services.company.create(company);
			setCompanies((prevCompanies) => [...prevCompanies, newCompany]);
		} catch (e) {
			console.log(e);
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
			console.log(e);
		} finally {
			setLoading({ ...loading, remove: false });
		}
	}

	async function getCompanies() {
		try {
			setLoading({ ...loading, get: true });
			const companies = await Services.company.getAll();
			setCompanies(companies);
		} catch (e) {
			console.log(e);
		} finally {
			setLoading({ ...loading, get: false });
		}
	}

	useEffect(() => {
		getCompanies();
	}, []);

	return (
		<CompanyContext.Provider value={{ companies, create, removeCompany }}>
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
