import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import useSEO from '@/hooks/use-seo';

export default function HomeApp() {
	useSEO({
		title: 'Overview | Dashboard Contapp',
		description:
			'Bienvenido a Contapp, la solución para gestionar operaciones contables, balances y plan de cuentas.',
		keywords: 'contapp, gestionar, operaciones, balances, plan de cuentas',
	});

	return (
		<div>
			<div className='flex items-center justify-between'>
				<h2 className='text-3xl font-bold tracking-tight'>Dashboard</h2>
			</div>
			<Tabs defaultValue='overview' className='space-y-4'>
				<TabsList>
					<TabsTrigger value='overview'>Overview</TabsTrigger>
					<TabsTrigger value='analytics' disabled>
						Analytics
					</TabsTrigger>
					<TabsTrigger value='reports' disabled>
						Reports
					</TabsTrigger>
					<TabsTrigger value='notifications' disabled>
						Notifications
					</TabsTrigger>
				</TabsList>
				<TabsContent value='overview' className='space-y-4'>
					here
				</TabsContent>
			</Tabs>
		</div>
	);
}
