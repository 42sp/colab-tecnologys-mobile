import { Text, View } from 'react-native'
import Card from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PaintRoller, Building2, House, Blocks, BrickWall, User } from 'lucide-react-native'
import { Task } from '@/api/get-tasks'
import { useSelector } from 'react-redux'
import { getRoles } from '@/api/get-roles'
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
}: ActivityCardProps) {
	const title = `${service_type} - ${service_stage} ${service_floor}/${service_apartment} - Torre ${service_tower}`
	const time = new Date(created_at as string)
	const [isApprover, setIsApprover] = useState(false)

	const userId = useSelector(selectUserId)
	const roleId = useSelector(selectRoleId)
	const validateRole = async () => {
		try {
			if (!roleId) return
			const role = await getRoles({ id: roleId })
			console.log(role)

			if (role.data[0].hierarchy_level >= 50) setIsApprover(true)
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
			const task = await patchTasks({ id, approver_id: userId, status: 'completed' })
			console.log(task)
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
						<Text className="text-md font-inter-bold ">{title}</Text>

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
					<View className={`pl-14 ${isApprover ? '' : 'hidden'}`}>
						<Button variant="green" title="Aprovar" onPress={() => handlePatchTasks()} />
					</View>
				</Card.Body>
			</Card>
		</View>
	)
}
