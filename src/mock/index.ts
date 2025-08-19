export const tarefeiros = {
	total: 1,
	limit: 10,
	skip: 0,
	data: [
		{
			id: 1,
			name: 'Reinando Mota',
			cpf: 'Rei',
			phoneNumber: 'Rei',
			email: 'reinando@temp.com',
			cep: '(11)4002-8922',
			address: 'Rua dos Tarefeiros, 123',
			city: 'São Paulo',
			state: 'SP',
			createdAt: '2023-10-01T12:00:00Z',
			updatedAt: '2023-10-01T12:00:00Z',
			photo: 'https://example.com/photo.jpg',
			isActive: true,
			isAvailable: true,
			area: 'Pedreiro',
			levelAccess: 'maintainer',
			workGroup: 'Tarefeiros',
		},
		{
			id: 2,
			name: 'Jorge da Silva',
			cpf: '12345678901',
			phoneNumber: '(11) 98765-4321',
			email: 'jorge@temp.com',
			cep: '(11)4002-8922',
			address: 'Rua dos Tarefeiros, 123',
			city: 'São Paulo',
			state: 'SP',
			createdAt: '2023-10-01T12:00:00Z',
			updatedAt: '2023-10-01T12:00:00Z',
			photo: 'https://example.com/photo.jpg',
			isActive: true,
			isAvailable: true,
			area: 'Pedreiro',
			levelAccess: 'maintainer',
			workGroup: 'Tarefeiros',
		},
		{
			id: 3,
			name: 'Marcos Oliveira',
			cpf: '98765432100',
			phoneNumber: '(11) 12345-6789',
			email: 'marcos@temp.com',
			cep: '(11)4002-8922',
			address: 'Rua dos Tarefeiros, 123',
			city: 'São Paulo',
			state: 'SP',
			createdAt: '2023-10-01T12:00:00Z',
			updatedAt: '2023-10-01T12:00:00Z',
			photo: 'https://example.com/photo.jpg',
			isActive: true,
			isAvailable: true,
			area: 'Pedreiro',
			levelAccess: 'maintainer',
			workGroup: 'Tarefeiros',
		},
		{
			id: 4,
			name: 'Caio Souza',
			cpf: '12345678901',
			phoneNumber: '(11) 98765-4321',
			email: 'caio@temp.com',
			cep: '(11)4002-8922',
			address: 'Rua dos Tarefeiros, 123',
			city: 'São Paulo',
			state: 'SP',
			createdAt: '2023-10-01T12:00:00Z',
			updatedAt: '2023-10-01T12:00:00Z',
			photo: 'https://example.com/photo.jpg',
			isActive: true,
			isAvailable: true,
			area: 'Pedreiro',
			levelAccess: 'maintainer',
			workGroup: 'Tarefeiros',
		},
		{
			id: 5,
			name: 'Gomes Augusto',
			cpf: '98765432100',
			phoneNumber: '(11) 12345-6789',
			email: 'gomes@temp.com',
			cep: '(11)4002-8922',
			address: 'Rua dos Tarefeiros, 123',
			city: 'São Paulo',
			state: 'SP',
			createdAt: '2023-10-01T12:00:00Z',
			updatedAt: '2023-10-01T12:00:00Z',
			photo: 'https://example.com/photo.jpg',
			isActive: true,
			isAvailable: true,
			area: 'Pedreiro',
			levelAccess: 'maintainer',
			workGroup: 'Tarefeiros',
		},
	],
}

export const areaMock = [
	{
		id: 1,
		name: 'Tarefeiro',
		description:
			'Profissional especializado em construção civil, responsável por alvenaria e estruturas.',
	},
	{
		id: 2,
		name: 'Ajudante',
		description: 'Especialista em instalações elétricas, manutenção e reparos.',
	},
	{
		id: 3,
		name: 'Encarregado',
		description:
			'Profissional que coordena e supervisiona equipes de trabalho na construção civil.',
	},
	{
		id: 4,
		name: 'Oficial',
		description: 'Especialista em alvenaria, responsável por construção e reparos de estruturas.',
	},
]

export const serviceTypeMock = [
	{
		id: 29,
		name: '2 pav 4'
	},
	{
		id: 32,
		name: '3 pav 4'
	},
		{
		id: 36,
		name: '4 pav 4'
	}
]

export const serviceMock = [
	{
		id: 1,
		name: 'Contrapiso',
		description:
			'Profissional especializado em construção civil, responsável por alvenaria e estruturas.',
	},
	{
		id: 2,
		name: 'Revestimento',
		description: 'Especialista em instalações elétricas, manutenção e reparos.',
	},
	{
		id: 3,
		name: 'Elevação de Paredes',
		description:
			'Profissional que coordena e supervisiona equipes de trabalho na construção civil.',
	},
	{
		id: 4,
		name: 'Alvenaria Cerâmica',
		description: 'Especialista em alvenaria, responsável por construção e reparos de estruturas.',
	},
]

export const andaresMock = [
	{
		id: 1,
		name: 'Andar 1',
		description: 'Andar com 4 apartamentos de 2 quartos.',
	},
	{
		id: 2,
		name: 'Andar 2',
		description: 'Andar com 4 apartamentos de 3 quartos.',
	},
	{
		id: 3,
		name: 'Andar 3',
		description: 'Andar com 4 apartamentos de 2 quartos.',
	},
	{
		id: 4,
		name: 'Andar 4',
		description: 'Andar com 4 apartamentos de 3 quartos.',
	},
	{
		id: 5,
		name: 'Casa de Máquinas',
		description: 'Andar com 4 apartamentos de 2 quartos.',
	},
	{
		id: 6,
		name: 'Cobertura',
		description: 'Andar com 4 apartamentos de 3 quartos.',
	},
	{
		id: 7,
		name: 'Térreo - Área Comum',
		description: 'Espaço compartilhado entre os moradores.',
	},
	{
		id: 8,
		name: 'Subsolo - Garagem',
		description: 'Área destinada ao estacionamento dos veículos.',
	},
]

export const residencialMock = {
	total: 2,
	limit: 10,
	skip: 0,
	data: [
		{
			id: 1,
			name: 'Residencial Quinta dos Olivardos',
			cep: '12345-678',
			address: 'Rua das Flores, 123',
			city: 'São Paulo',
			state: 'SP',
			createdAt: '2023-10-01T12:00:00Z',
			updatedAt: '2023-10-01T12:00:00Z',
			photo: 'https://example.com/photo.jpg',
			torres: {
				total: 2,
				data: [
					{
						id: 1,
						name: 'Torre 1',
						andares: {
							total: 4,
							data: andaresMock,
						},
					},
					{
						id: 2,
						name: 'Torre 2',
						andares: {
							total: 4,
							data: andaresMock,
						},
					},
				],
			},
		},
		{
			id: 2,
			name: 'Residencial Jardim das Palmeiras',
			cep: '23456-789',
			address: 'Avenida das Palmeiras, 456',
			city: 'São Paulo',
			state: 'SP',
			createdAt: '2023-10-01T12:00:00Z',
			updatedAt: '2023-10-01T12:00:00Z',
			photo: 'https://example.com/photo.jpg',
			torres: {
				total: 3,
				data: [
					{
						id: 1,
						name: 'Torre A',
						andares: {
							total: 5,
							data: andaresMock,
						},
					},
					{
						id: 2,
						name: 'Torre B',
						andares: {
							total: 5,
							data: andaresMock,
						},
					},
					{
						id: 3,
						name: 'Torre C',
						andares: {
							total: 5,
							data: andaresMock,
						},
					},
				],
			},
		},
	],
}

export interface ActivityService {
	id: string
	title: string
	serviceType: 'parede' | 'contrapiso' | 'pintura'
	location: string
	locationType: 'house' | 'building'
	employee: string
	time: Date
	status: 'pending' | 'approved' | 'completed'
}

const today = new Date()
const yesterday = new Date(today)
yesterday.setDate(yesterday.getDate() - 1)

export const activityMock: { total: number; data: ActivityService[] } = {
	total: 12,
	data: [
		{
			id: '01',
			title: '2 paredes construídas',
			serviceType: 'parede',
			location: 'Andar 3, Bloco B, Residencial Jardins',
			locationType: 'house',
			employee: 'Carlos Silva',
			time: new Date('2025-08-06T16:42:00'),
			status: 'completed',
		},
		{
			id: '02',
			title: 'Contrapiso nivelado',
			serviceType: 'contrapiso',
			location: 'Garagem, Bloco A, Residencial Jardins',
			locationType: 'building',
			employee: 'Pedro Oliveira',
			time: new Date('2025-08-07T10:15:00'),
			status: 'approved',
		},
		{
			id: '03',
			title: 'Pintura das escadas',
			serviceType: 'pintura',
			location: 'Escadaria principal, Torre Central',
			locationType: 'building',
			employee: 'Marcos Santos',
			time: new Date('2025-08-07T14:00:00'),
			status: 'pending',
		},
		{
			id: '04',
			title: 'Parede do hall finalizada',
			serviceType: 'parede',
			location: 'Hall de entrada, Torre Sul',
			locationType: 'building',
			employee: 'Ana Costa',
			time: new Date('2025-08-07T09:30:00'),
			status: 'completed',
		},
		{
			id: '05',
			title: 'Contrapiso sala de reunião',
			serviceType: 'contrapiso',
			location: '3º andar, Bloco Administrativo',
			locationType: 'building',
			employee: 'Pedro Oliveira',
			time: new Date('2025-08-08T11:00:00'),
			status: 'approved',
		},
		{
			id: '06',
			title: 'Pintura externa concluída',
			serviceType: 'pintura',
			location: 'Fachada principal, Residencial Primavera',
			locationType: 'house',
			employee: 'Marcos Santos',
			time: new Date('2025-08-08T16:45:00'),
			status: 'pending',
		},
		{
			id: '07',
			title: 'Paredes da cozinha',
			serviceType: 'parede',
			location: 'Casa 12, Condomínio Boa Vista',
			locationType: 'house',
			employee: 'Carlos Silva',
			time: yesterday,
			status: 'completed',
		},
		{
			id: '08',
			title: 'Contrapiso garagem',
			serviceType: 'contrapiso',
			location: 'Casa 15, Condomínio Boa Vista',
			locationType: 'house',
			employee: 'Pedro Oliveira',
			time: yesterday,
			status: 'approved',
		},
		{
			id: '09',
			title: 'Pintura do quarto',
			serviceType: 'pintura',
			location: 'Casa 9, Condomínio Boa Vista',
			locationType: 'house',
			employee: 'Marcos Santos',
			time: yesterday,
			status: 'pending',
		},
		{
			id: '10',
			title: 'Paredes do salão de festas',
			serviceType: 'parede',
			location: 'Área comum, Residencial Jardins',
			locationType: 'building',
			employee: 'Carlos Silva',
			time: today,
			status: 'completed',
		},
		{
			id: '11',
			title: 'Contrapiso da varanda',
			serviceType: 'contrapiso',
			location: 'Cobertura Bloco B, Residencial Jardins',
			locationType: 'house',
			employee: 'Pedro Oliveira',
			time: today,
			status: 'approved',
		},
		{
			id: '12',
			title: 'Pintura da garagem subterrânea',
			serviceType: 'pintura',
			location: 'Subsolo Bloco C, Torre Central',
			locationType: 'building',
			employee: 'Marcos Santos',
			time: today,
			status: 'approved',
		},
	],
}
