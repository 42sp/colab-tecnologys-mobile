import { Text, View } from 'react-native'
import Card from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PaintRoller, Building2, Blocks, BrickWall, User, CheckCheck } from 'lucide-react-native'
import { Task } from '@/api/get-tasks'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { patchTasks } from '@/api/patch-tasks'
import { RootState } from '@/libs/redux/store'

interface ActivityCardProps extends Task {}

export function ActivityCard({
	id,
	service_type,
	construction_name,
	worker_name,
	service_stage,
	service_floor,
	service_apartment,
	service_tower,
	completion_date,
	status,
}: ActivityCardProps) {
	const title = `${service_type} - ${service_stage} ${service_floor}/${service_apartment} - Torre ${service_tower}`
	const time = new Date(completion_date as Date)
	const [isVisibleApprove, setIsVisibleApprove] = useState(false)
	const { hierarchy_level } = useSelector((state: RootState) => state.roles)
	const [statusTask, setStatusTask] = useState(status)

	const { userId } = useSelector((state: RootState) => state.userProfile)

	useEffect(() => {
		if (hierarchy_level >= 50) setIsVisibleApprove(true)
	}, [hierarchy_level])

	async function handlePatchTasks() {
		try {
			if (!id) return
			await patchTasks({ id, approver_id: userId, status: 'completed' })
			setStatusTask('approved')
		} catch (error) {
			console.log(error)
		}
	}

	function getJobTypeIcon() {
		switch (service_type) {
			case 'Alvenaria':
				return (
					<View className="size-10 items-center justify-center rounded-full bg-blue-100">
						<BrickWall size={18} color="#262626" />
					</View>
				)
			case 'Contrapiso':
				return (
					<View className="size-10 items-center justify-center rounded-full bg-red-100">
						<Blocks size={18} color="#262626" />
					</View>
				)
			case 'Pintura':
				return (
					<View className="size-10 items-center justify-center rounded-full bg-amber-100">
						<PaintRoller size={18} color="#262626" />
					</View>
				)
		}
	}

	return (
		<View className="">
			<Card className="flex-row">
				{getJobTypeIcon()}
				<Card.Body className="flex-1 justify-between gap-4 ">
					<View className="flex-row justify-between">
						<Text className="text-md max-w-52 font-inter-bold">{title}</Text>

						<Text className="font-inter text-xs">
							{time
								? time.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
								: '00:00'}
						</Text>
					</View>
					<View>
						<View className="flex-row gap-2">
							<Building2 size={14} color="black" />
							<Text className="flex-1 font-inter text-sm">{construction_name}</Text>
						</View>
						<View className="flex-row gap-2">
							<User size={14} color="black" />
							<Text className="flex-1 font-inter text-sm">{worker_name}</Text>
						</View>
					</View>
					<View className="self-end flex-row gap-3">
						{!isVisibleApprove && ["pending"].includes(statusTask ?? '') && (
							<View className="self-end">
								<View
									className="h-10 w-32 flex-row gap-1 bg-orange-100 rounded-full items-center justify-center"
								>
									<Text className="font-inter-medium text-[#EAB308]">
										Pendente
									</Text>
									{statusTask === 'approved' && <CheckCheck stroke="#fff" />}
								</View>
							</View>
						)}
						{isVisibleApprove && (
							<View className="self-end">
								<Button
									className="h-10 w-32 flex-row gap-1 bg-green-800"
									variant="rounded"
									onPress={() => handlePatchTasks()}
									disabled={statusTask === 'approved'}
								>
									<Text className="font-inter-medium text-neutral-100">
										{statusTask === 'approved' ? 'Aprovado' : 'Aprovar'}
									</Text>
									{statusTask === 'approved' && <CheckCheck stroke="#fff" />}
								</Button>
							</View>
						)}
					</View>
				</Card.Body>
			</Card>
		</View>
	)
}
