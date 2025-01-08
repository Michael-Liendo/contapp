import useSEO from '@/hooks/use-seo';

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
		<div>
			<h1>Hello world</h1>
		</div>
	);
}
