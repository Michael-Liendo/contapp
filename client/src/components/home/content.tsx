interface TextFeatures {
	id: number;
	title: string;
	link: string;
	desc: string;
	date: string;
}

// Use API or link to show title PR
export const textFeatures: TextFeatures[] = [
	{
		id: 1,
		title: 'Easy Contact Organization', // Here title PR or title feature
		link: '', // Here link PR
		desc: 'Lorem Impsum', // Maybe manual type?
		date: '24/01/2025', // Here api date
	},
	{
		id: 2,
		title: 'Quick Search & Filtering',
		link: '',
		desc: '',
		date: '',
	},
	{
		id: 3,
		title: 'Secure Data Storage',
		link: '',
		desc: '',
		date: '',
	},
];

interface TextGettingStart {
	id: number;
	title: string;
	description: string;
}

export const textGettingStart: TextGettingStart[] = [
	{
		id: 1,
		title: 'Crear un plan de cuentas',
		description: 'Configuración Contable > Plan de Cuentas',
	},
	{
		id: 2,
		title: 'Registre un asiento contable',
		description: 'Operaciones Contables > Registrar Asiento Contable',
	},
	// Here.. more steps
];
