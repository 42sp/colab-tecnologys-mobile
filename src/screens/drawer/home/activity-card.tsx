import { Text, View } from 'react-native'
import Card from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PaintRoller, Building2, Blocks, BrickWall, User, CheckCheck } from 'lucide-react-native'
import { getTasks, Task, TasksServices } from '@/api/get-tasks'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { patchTasks } from '@/api/patch-tasks'
import { RootState } from '@/libs/redux/store'
import { getCurrentDate } from '@/utils'
import { toStringDate, toStringDateClean } from './utils'
import { cn } from '@/lib/utils'
import LoadingButton from '@/components/ui/loadingButton'
import { serviceMap } from '@/screens/drawer/register-service/type-service-form'

interface ActivityCardProps extends TasksServices {
	onRefresh: () => Promise<void>
}

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
	onRefresh,
	service_acronym
}: ActivityCardProps) {
	const title = `${serviceMap[service_acronym ?? ""]} | Parede ${service_stage} - ${service_floor} - Torre ${service_tower} - Ap ${service_apartment}`
	const time = new Date(completion_date as Date)
	const { hierarchy_level } = useSelector((state: RootState) => state.roles)
	const [statusTask, setStatusTask] = useState(status)
	const [patching, setPatching] = useState(false)

	const { userId } = useSelector((state: RootState) => state.userProfile)

	async function handlePatchTasks() {
		try {
			if (!id || hierarchy_level <= 49) return
			setPatching(true)
			await patchTasks({ id, approver_id: userId, status: 'completed' })
			await onRefresh()
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
		<>
			<Card className="flex-row">
				{getJobTypeIcon()}
				<Card.Body className="flex-1 justify-between gap-4 ">
					<View className="flex-row justify-between">
						<Text className="text-md max-w-52 font-inter-bold">{title}</Text>

						<Text className="font-inter text-sm">{time ? toStringDateClean(time) : '00:00'}</Text>
					</View>
					<View className="flex-row justify-between">
						<View className="w-23">
							<View className="flex-row gap-3">
								<Building2 size={14} color="black" />
								<Text className="font-inter text-sm">{construction_name}</Text>
							</View>
							<View className="flex-row gap-3">
								<User size={14} color="black" />
								<Text className="font-inter text-sm">{worker_name}</Text>
							</View>
						</View>
						<View className="flex-row gap-2">
							<View className="">
								{statusTask === 'completed' ? (
									<View className="h-10 w-20 flex-row items-center justify-center gap-1 rounded-full bg-green-700">
										<CheckCheck stroke="#fff" />
									</View>
								) : (
									<LoadingButton
										title={'Pendente'}
										loading={patching}
										onPress={handlePatchTasks}
										className={cn(`w-27 h-11 flex-row `, ' bg-orange-700')}
									/>
								)}
							</View>
						</View>
					</View>
				</Card.Body>
			</Card>
		</>
	)
}

/*<Button
										className={cn(`h-10 w-28 flex-row gap-1`, ' bg-orange-700')}
										variant="rounded"
										onPress={() => handlePatchTasks()}
										disabled={hierarchy_level <= 49 ? true : false}
									>
										<Text className="font-inter-medium text-neutral-100">{'Pendente'}</Text>
									</Button>*/
