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
