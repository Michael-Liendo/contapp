import ButtonTooltip from '@/components/home/ButtonTooltip';
import { textFeatures, textGettingStart } from '@/components/home/content';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import useSEO from '@/hooks/use-seo';
import { CheckCircle } from 'lucide-react';

export default function HomeApp() {
	useSEO({
		title: 'Home Page - Contapp',
		description:
			'Welcome to the home page of Contapp, your app for managing contacts.',
		keywords: 'contacts, management, app, Contapp',
		author: 'Contapp Team',
		robots: 'index, follow',
	});

	return (
		<div className='container mx-auto px-4 py-8'>
			<header className='text-center mb-12'>
				<h1 className='text-4xl font-bold mb-4'>Bienvenido a Contapp</h1>
				<p className='text-xl text-muted-foreground'>
					La solución para gestionar operaciones contables, balances y plan de
					cuentas.
				</p>
			</header>

			<section className='mb-12'>
				<h2 className='text-2xl font-semibold mb-4'>Actualizaciones</h2>
				<div className='grid md:grid-cols-1 lg:grid-cols-3 gap-6'>
					{textFeatures.map((feature) => (
						<Card key={feature.id}>
							<CardHeader>
								<CardTitle className='flex items-center'>
									<CheckCircle className='mr-2 h-5 w-5 text-green-500' />
									{feature.title}
									<ButtonTooltip link={feature.link} />
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p>{feature.desc}</p>
							</CardContent>
							<CardFooter>{feature.date}</CardFooter>
						</Card>
					))}
				</div>
			</section>

			<section>
				<h2 className='text-2xl font-semibold mb-4'>Primeros pasos</h2>
				<div className='grid md:grid-cols-1 lg:grid-cols-3 gap-6'>
					{textGettingStart.map((step) => (
						<Card key={step.id}>
							<CardHeader>
								<CardTitle>{step.title}</CardTitle>
								<CardDescription>{step.description}</CardDescription>
							</CardHeader>
						</Card>
					))}
				</div>
			</section>
		</div>
	);
}
