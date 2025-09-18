import { View } from 'react-native'
import { ActivityCard } from './activity-card'

export interface Task {
	id: string
	service_id: string
	worker_id: string
	approver_id: string
	status: 'pending' | 'in_progress' | 'completed' | 'approved' | 'rejected'
	completion_date: Date
	task_percentage: number
	updated_at: Date
	created_at: Date

	worker_name: string
	construction_name: string
	construction_address: string
	service_tower: string
	service_apartment: string
	service_floor: string
	service_stage: string
	service_type: string
}

export const taskMock: Task[] = [
	// Mocks originais
	{
		id: '1',
		service_id: 'SRV001',
		worker_id: 'WRK001',
		approver_id: 'APR001',
		status: 'pending',
		completion_date: new Date('2024-01-15'),
		task_percentage: 0,
		updated_at: new Date('2024-01-10'),
		created_at: new Date('2024-01-10'),
		worker_name: 'João Silva',
		construction_name: 'Residencial Jardins',
		construction_address: 'Rua das Flores, 123 - Jardim Botânico',
		service_tower: 'Torre A',
		service_apartment: '101',
		service_floor: 'Térreo',
		service_stage: 'Estrutura',
		service_type: 'Alvenaria',
	},
	{
		id: '2',
		service_id: 'SRV002',
		worker_id: 'WRK002',
		approver_id: 'APR002',
		status: 'in_progress',
		completion_date: new Date('2024-01-20'),
		task_percentage: 35,
		updated_at: new Date('2024-01-12'),
		created_at: new Date('2024-01-08'),
		worker_name: 'Maria Santos',
		construction_name: 'Edifício Central Plaza',
		construction_address: 'Av. Paulista, 1000 - Bela Vista',
		service_tower: 'Torre B',
		service_apartment: '205',
		service_floor: '2º Andar',
		service_stage: 'Acabamento',
		service_type: 'Pintura',
	},
	{
		id: '3',
		service_id: 'SRV003',
		worker_id: 'WRK003',
		approver_id: 'APR001',
		status: 'completed',
		completion_date: new Date('2024-01-18'),
		task_percentage: 100,
		updated_at: new Date('2024-01-18'),
		created_at: new Date('2024-01-05'),
		worker_name: 'Carlos Oliveira',
		construction_name: 'Condomínio Vila Verde',
		construction_address: 'Rua Verde, 456 - Vila Madalena',
		service_tower: 'Bloco C',
		service_apartment: '302',
		service_floor: '3º Andar',
		service_stage: 'Instalações',
		service_type: 'Elétrica',
	},
	{
		id: '4',
		service_id: 'SRV004',
		worker_id: 'WRK004',
		approver_id: 'APR003',
		status: 'approved',
		completion_date: new Date('2024-01-14'),
		task_percentage: 100,
		updated_at: new Date('2024-01-14'),
		created_at: new Date('2024-01-02'),
		worker_name: 'Ana Costa',
		construction_name: 'Residencial Jardins',
		construction_address: 'Rua das Flores, 123 - Jardim Botânico',
		service_tower: 'Torre A',
		service_apartment: '408',
		service_floor: '4º Andar',
		service_stage: 'Acabamento',
		service_type: 'Cerâmica',
	},
	{
		id: '5',
		service_id: 'SRV005',
		worker_id: 'WRK005',
		approver_id: 'APR002',
		status: 'rejected',
		completion_date: new Date('2024-01-22'),
		task_percentage: 80,
		updated_at: new Date('2024-01-16'),
		created_at: new Date('2024-01-12'),
		worker_name: 'Pedro Almeida',
		construction_name: 'Edifício Central Plaza',
		construction_address: 'Av. Paulista, 1000 - Bela Vista',
		service_tower: 'Torre A',
		service_apartment: '150',
		service_floor: 'Térreo - Área Comum',
		service_stage: 'Estrutura',
		service_type: 'Hidráulica',
	},
	{
		id: '6',
		service_id: 'SRV006',
		worker_id: 'WRK001',
		approver_id: 'APR001',
		status: 'in_progress',
		completion_date: new Date('2024-01-25'),
		task_percentage: 65,
		updated_at: new Date('2024-01-18'),
		created_at: new Date('2024-01-15'),
		worker_name: 'João Silva',
		construction_name: 'Condomínio Vila Verde',
		construction_address: 'Rua Verde, 456 - Vila Madalena',
		service_tower: 'Bloco A',
		service_apartment: '501',
		service_floor: '5º Andar',
		service_stage: 'Instalações',
		service_type: 'Ar Condicionado',
	},
	{
		id: '7',
		service_id: 'SRV007',
		worker_id: 'WRK006',
		approver_id: 'APR003',
		status: 'pending',
		completion_date: new Date('2024-01-30'),
		task_percentage: 0,
		updated_at: new Date('2024-01-19'),
		created_at: new Date('2024-01-19'),
		worker_name: 'Lucas Ferreira',
		construction_name: 'Residencial Jardins',
		construction_address: 'Rua das Flores, 123 - Jardim Botânico',
		service_tower: 'Torre B',
		service_apartment: '703',
		service_floor: '7º Andar',
		service_stage: 'Estrutura',
		service_type: 'Alvenaria',
	},
	{
		id: '8',
		service_id: 'SRV008',
		worker_id: 'WRK002',
		approver_id: 'APR002',
		status: 'completed',
		completion_date: new Date('2024-01-17'),
		task_percentage: 100,
		updated_at: new Date('2024-01-17'),
		created_at: new Date('2024-01-10'),
		worker_name: 'Maria Santos',
		construction_name: 'Edifício Central Plaza',
		construction_address: 'Av. Paulista, 1000 - Bela Vista',
		service_tower: 'Torre C',
		service_apartment: '1204',
		service_floor: '12º Andar',
		service_stage: 'Acabamento',
		service_type: 'Gesso',
	},
	{
		id: '9',
		service_id: 'SRV009',
		worker_id: 'WRK007',
		approver_id: 'APR001',
		status: 'in_progress',
		completion_date: new Date('2024-02-02'),
		task_percentage: 25,
		updated_at: new Date('2024-01-20'),
		created_at: new Date('2024-01-18'),
		worker_name: 'Roberto Lima',
		construction_name: 'Condomínio Vila Verde',
		construction_address: 'Rua Verde, 456 - Vila Madalena',
		service_tower: 'Bloco B',
		service_apartment: '201',
		service_floor: '2º Andar',
		service_stage: 'Instalações',
		service_type: 'Gás',
	},
	{
		id: '10',
		service_id: 'SRV010',
		worker_id: 'WRK003',
		approver_id: 'APR003',
		status: 'approved',
		completion_date: new Date('2024-01-16'),
		task_percentage: 100,
		updated_at: new Date('2024-01-16'),
		created_at: new Date('2024-01-08'),
		worker_name: 'Carlos Oliveira',
		construction_name: 'Residencial Jardins',
		construction_address: 'Rua das Flores, 123 - Jardim Botânico',
		service_tower: 'Torre A',
		service_apartment: '609',
		service_floor: '6º Andar',
		service_stage: 'Acabamento',
		service_type: 'Piso',
	},
	// Novos mocks
	{
		id: '11',
		service_id: 'SRV011',
		worker_id: 'WRK008',
		approver_id: 'APR001',
		status: 'in_progress',
		completion_date: new Date('2024-01-18'), // Mesmo dia do ID 3
		task_percentage: 50,
		updated_at: new Date('2024-01-18'),
		created_at: new Date('2024-01-15'),
		worker_name: 'Fernanda Souza',
		construction_name: 'Edifício Central Plaza',
		construction_address: 'Av. Paulista, 1000 - Bela Vista',
		service_tower: 'Torre B',
		service_apartment: '801',
		service_floor: '8º Andar',
		service_stage: 'Acabamento',
		service_type: 'Pintura',
	},
	{
		id: '12',
		service_id: 'SRV012',
		worker_id: 'WRK009',
		approver_id: 'APR002',
		status: 'completed',
		completion_date: new Date('2024-01-18'), // Mesmo dia do ID 3
		task_percentage: 100,
		updated_at: new Date('2024-01-18'),
		created_at: new Date('2024-01-14'),
		worker_name: 'Ricardo Pereira',
		construction_name: 'Residencial Jardins',
		construction_address: 'Rua das Flores, 123 - Jardim Botânico',
		service_tower: 'Torre C',
		service_apartment: '202',
		service_floor: '2º Andar',
		service_stage: 'Instalações',
		service_type: 'Hidráulica',
	},
	{
		id: '13',
		service_id: 'SRV013',
		worker_id: 'WRK001',
		approver_id: 'APR003',
		status: 'approved',
		completion_date: new Date('2024-01-20'), // Mesmo dia do ID 2
		task_percentage: 100,
		updated_at: new Date('2024-01-20'),
		created_at: new Date('2024-01-16'),
		worker_name: 'João Silva',
		construction_name: 'Condomínio Vila Verde',
		construction_address: 'Rua Verde, 456 - Vila Madalena',
		service_tower: 'Bloco D',
		service_apartment: '101',
		service_floor: '1º Andar',
		service_stage: 'Estrutura',
		service_type: 'Fundação',
	},
	{
		id: '14',
		service_id: 'SRV014',
		worker_id: 'WRK002',
		approver_id: 'APR001',
		status: 'in_progress',
		completion_date: new Date('2024-01-22'), // Mesmo dia do ID 5
		task_percentage: 70,
		updated_at: new Date('2024-01-22'),
		created_at: new Date('2024-01-18'),
		worker_name: 'Maria Santos',
		construction_name: 'Residencial Jardins',
		construction_address: 'Rua das Flores, 123 - Jardim Botânico',
		service_tower: 'Torre A',
		service_apartment: '905',
		service_floor: '9º Andar',
		service_stage: 'Acabamento',
		service_type: 'Gesso',
	},
	{
		id: '15',
		service_id: 'SRV015',
		worker_id: 'WRK010',
		approver_id: 'APR002',
		status: 'pending',
		completion_date: new Date('2024-01-22'), // Mesmo dia do ID 5
		task_percentage: 0,
		updated_at: new Date('2024-01-22'),
		created_at: new Date('2024-01-22'),
		worker_name: 'Juliana Alves',
		construction_name: 'Edifício Central Plaza',
		construction_address: 'Av. Paulista, 1000 - Bela Vista',
		service_tower: 'Torre C',
		service_apartment: '1403',
		service_floor: '14º Andar',
		service_stage: 'Instalações',
		service_type: 'Elétrica',
	},
]

export function Activity() {
	return (
		<View className="m-4">
			{(
				Object.entries(
					taskMock.reduce(
						(acc: Record<string, Task[]>, task: Task) => {
							const dateKey = task.completion_date.toISOString().split('T')[0]
							if (!acc[dateKey]) {
								acc[dateKey] = []
							}
							acc[dateKey].push(task)
							return acc
						},
						{} as Record<string, Task[]>,
					),
				) as [string, Task[]][]
			).map(([date, dateTasks]) => (
				<ActivityCard key={date} date={date} dateTasks={dateTasks} />
			))}
		</View>
	)
}
