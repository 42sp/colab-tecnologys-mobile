export interface ActivityData {
	id: string
	title: string
	jobType: 'parede' | 'contrapiso' | 'pintura'
	location: string
	locationType: string
	employee: string
	time: Date
}

export const mockData: ActivityData[] = [
	{
		title: '2 paredes construídas',
		jobType: 'parede',
		location: 'Andar 3, Bloco B, Residencial Jardins',
		locationType: 'unidade',
		employee: 'Carlos Silva',
		time: new Date('2025-08-06T16:42:00'),
		id: '01',
	},
	{
		title: 'Contrapiso',
		jobType: 'contrapiso',
		location: 'Andar 2, Bloco A, Residencial Jardins',
		locationType: 'unidade',
		employee: 'Pedro Oliveira',
		time: new Date('2025-08-07T10:15:00'),
		id: '02',
	},
	{
		title: 'Pintura finalizada',
		jobType: 'pintura',
		location: 'Andar 1, Bloco c, Residencial Jardins',
		locationType: 'predio',
		employee: 'Marcos Santos',
		time: new Date('2025-08-07T14:00:00'),
		id: '03',
	},
	{
		title: '2 paredes construídas',
		jobType: 'parede',
		location: 'Andar 3, Bloco B, Residencial Jardins',
		locationType: 'unidade',
		employee: 'Carlos Silva',
		time: new Date('2025-08-07T09:30:00'),
		id: '04',
	},
	{
		title: 'Contrapiso',
		jobType: 'contrapiso',
		location: 'Andar 2, Bloco A, Residencial Jardins',
		locationType: 'unidade',
		employee: 'Pedro Oliveira',
		time: new Date('2025-08-08T11:00:00'),
		id: '05',
	},
	{
		title: 'Pintura finalizada',
		jobType: 'pintura',
		location: 'Andar 1, Bloco c, Residencial Jardins',
		locationType: 'predio',
		employee: 'Marcos Santos',
		time: new Date('2025-08-08T16:45:00'),
		id: '06',
	},
	{
		title: '2 paredes construídas',
		jobType: 'parede',
		location: 'Andar 3, Bloco B, Residencial Jardins',
		locationType: 'unidade',
		employee: 'Carlos Silva',
		time: new Date('2025-08-08T18:45:00'),
		id: '07',
	},
	{
		title: 'Contrapiso',
		jobType: 'contrapiso',
		location: 'Andar 2, Bloco A, Residencial Jardins',
		locationType: 'unidade',
		employee: 'Pedro Oliveira',
		time: new Date('2025-08-09T16:45:00'),
		id: '08',
	},
	{
		title: 'Pintura finalizada',
		jobType: 'pintura',
		location: 'Andar 1, Bloco c, Residencial Jardins',
		locationType: 'predio',
		employee: 'Marcos Santos',
		time: new Date('2025-08-09T10:09:00'),
		id: '09',
	},
	{
		title: '2 paredes construídas',
		jobType: 'parede',
		location: 'Andar 3, Bloco B, Residencial Jardins',
		locationType: 'unidade',
		employee: 'Carlos Silva',
		time: new Date('2025-08-09T14:35:00'),
		id: '10',
	},
	{
		title: 'Contrapiso',
		jobType: 'contrapiso',
		location: 'Andar 2, Bloco A, Residencial Jardins',
		locationType: 'unidade',
		employee: 'Pedro Oliveira',
		time: new Date('2025-08-10T12:22:00'),
		id: '11',
	},
	{
		title: 'Pintura finalizada',
		jobType: 'pintura',
		location: 'Andar 1, Bloco c, Residencial Jardins',
		locationType: 'predio',
		employee: 'Marcos Santos',
		time: new Date('2025-08-10T09:35:00'),
		id: '12',
	},
]
