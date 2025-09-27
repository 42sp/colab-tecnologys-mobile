import { Text, TouchableOpacity, View } from 'react-native'
import Card from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PaintRoller, Building2, Blocks, BrickWall, User, CheckCheck } from 'lucide-react-native'
import { Task } from '@/api/get-tasks'
import { useSelector } from 'react-redux'
import { getRoles, Roles } from '@/api/get-roles'
import { useEffect, useState } from 'react'
import { patchTasks } from '@/api/patch-tasks'
import { selectRoleId, selectUserId } from '@/libs/redux/user-profile/user-profile-slice'

interface ActivityCardProps extends Task {}

export function ActivityCard({
	id,
	service_type,
	construction_name,
	construction_address,
	service_stage,
	service_floor,
	service_apartment,
	service_tower,
	created_at,
	status,
}: ActivityCardProps) {
	const title = `${service_type} - ${service_stage} ${service_floor}/${service_apartment} - Torre ${service_tower}`
	const time = new Date(created_at as string)
	const [isVisibleApprove, setIsVisibleApprove] = useState(false)
	const [statusTask, setStatusTask] = useState(status)

	const userId = useSelector(selectUserId)
	const roleId = useSelector(selectRoleId)
	const validateRole = async () => {
		try {
			if (!roleId) return
			const role = (await getRoles({ id: roleId })) as Roles
			if (role.hierarchy_level >= 50) setIsVisibleApprove(true)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		validateRole()
	}, [])

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
								? time.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
								: '00:00'}
						</Text>
					</View>
					<View>
						<View className="flex-row gap-2">
							<Building2 size={14} color="black" />
							<Text className="flex-1 font-inter text-sm">{construction_address}</Text>
						</View>
						<View className="flex-row gap-2">
							<User size={14} color="black" />
							<Text className="flex-1 font-inter text-sm">{construction_name}</Text>
						</View>
					</View>
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
				</Card.Body>
			</Card>
		</View>
	)
}
