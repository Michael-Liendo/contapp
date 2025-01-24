interface TextGettingStart {
	id: number;
	title: string;
	description: string;
	link: string;
}

export const textGettingStart: TextGettingStart[] = [
	{
		id: 0,
		title: 'Crear una compañia',
		description:
			'Arriba de la sección general, haga clic en Crear una compañia y agregue una nueva.',
		link: '/',
	},
	{
		id: 1,
		title: 'Crear un plan de cuentas',
		description: 'Configuración Contable > Plan de Cuentas',
		link: '/accounts-plan',
	},
	{
		id: 2,
		title: 'Crear un asiento',
		description: 'Operaciones Contables > Registrar Asiento Contable',
		link: '/journals/create',
	},
	// Here.. more steps
];
