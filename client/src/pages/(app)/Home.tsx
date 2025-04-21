import ButtonTooltip from '@/components/home/ButtonTooltip';
import { textGettingStart } from '@/components/home/content';
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import useSEO from '@/hooks/use-seo';
import Services from '@/services';
import { useIonViewDidEnter } from '@ionic/react';

export default function HomeApp() {
	useSEO({
		title: 'Inicio',
		description:
			'Bienvenido a Contapp, la solución para gestionar operaciones contables, balances y plan de cuentas.',
		keywords: 'contapp, gestionar, operaciones, balances, plan de cuentas',
	});

	useIonViewDidEnter(() => {
		Services.firebase.logEvent('tutorial_begin');
	}, []);

	return (
		<div className='container mx-auto px-4 py-8'>
			<header className='text-center mb-12'>
				<h1 className='text-4xl font-bold mb-4'>Bienvenido a Contapp</h1>
				<p className='text-xl text-muted-foreground'>
					La solución para gestionar operaciones contables, balances y plan de
					cuentas.
				</p>
			</header>
			<section>
				<h2 className='text-2xl font-semibold mb-4'>Primeros pasos</h2>
				<div className='grid md:grid-cols-1 lg:grid-cols-3 gap-6'>
					{textGettingStart.map((step) => (
						<Card key={step.id}>
							<CardHeader>
								<div className='flex mb-3'>
									<CardTitle className='mr-2'>{step.title}</CardTitle>
									<ButtonTooltip link={step.link} />
								</div>
								<CardDescription>{step.description}</CardDescription>
							</CardHeader>
						</Card>
					))}
				</div>
			</section>
		</div>
	);
}
