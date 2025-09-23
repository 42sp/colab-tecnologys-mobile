import { View, Pressable, Text } from 'react-native'
import { Controller, FieldErrors, useFieldArray, useWatch, type Control } from 'react-hook-form'
import type { RegisterServiceType } from '@/screens/drawer/register-service/register-service'
import Card from '@/components/ui/card'
import { Dropdown } from '@/components/ui/dropdown'
import { Feather } from '@expo/vector-icons'
import { AllProfileResponse } from '@/api/get-profile'

type Props = {
	control: Control<RegisterServiceType>
	errors: FieldErrors<RegisterServiceType>
	profiles: AllProfileResponse[]
}

const MAX_WORKERS = 4

const percentOptions = Array.from({ length: 11 }, (_, i) => {
	const v = i * 10
	return { label: `${v}%`, value: `${v}%` }
})

function distributeEvenly(n: number): number[] {
	if (n <= 0) return []

	const base = Math.floor(100 / n)
	let remainder = 100 - base * n

	const result = Array.from({ length: n }, () => base)

	for (let i = 0; remainder > 0; i++) {
		result[i % n] += 1
		remainder--
	}

	return result
}

export function WorkersForm({ control, errors, profiles }: Props) {
	const workerOptions = profiles.map((t) => {
		const nameSplit = t.name.split(' ').filter(Boolean)
		const shortName = nameSplit.length > 1 ? `${nameSplit[0]} ${nameSplit.pop()}` : t.name

		return { label: shortName, value: t.user_id }
	})

	const { fields, append, update, remove } = useFieldArray({
		control,
		name: 'workers',
		keyName: '_id',
	})

	const rows = useWatch({ control, name: 'workers' }) ?? []

	function handleAdd() {
		if (fields.length >= MAX_WORKERS) return

		const newTotal = fields.length + 1
		const newDistribution = distributeEvenly(newTotal)

		fields.forEach((_, index) => {
			const updatedWorker = { ...(rows?.[index] ?? {}), percent: newDistribution[index] }
			update(index, updatedWorker)
		})

		append({
			percent: newDistribution[newTotal - 1],
			worker_id: '',
		})
	}

	return (
		<View>
			<Card className="ml-6 mr-6 mt-6">
				<Card.Header className="mb-1 flex-row items-center justify-between">
					<Text className="font-inter-bold text-xl text-black">Executor</Text>
					<Pressable
						onPress={handleAdd}
						className="h-9 items-center justify-center rounded-lg border-2 border-gray-200 px-3 disabled:opacity-40"
						disabled={fields.length >= MAX_WORKERS}
					>
						<Text className="w-[135px] text-center text-xl text-gray-700">Adicionar</Text>
					</Pressable>
				</Card.Header>

				<Card.Body>
					{fields.map((f: any, idx: number) => {
						const rowError = Array.isArray(errors.workers) ? errors.workers[idx] : undefined

						return (
							<View key={f._id} className="flex-row items-center gap-2">
								<View className="flex-[2]">
									<Controller
										control={control}
										name={`workers.${idx}.percent` as const}
										render={({ field: { onChange, value } }) => (
											<Dropdown
												IconRight={'chevron-down'}
												options={percentOptions}
												variant="outline"
												placeholder="50%"
												value={typeof value === 'number' ? `${value}%` : ''}
												onChangeText={(v: any) =>
													onChange(parseInt(String(v).replace(/[^0-9]/g, ''), 10))
												}
												hasError={!!rowError?.percent}
											/>
										)}
									/>
									<View className="h-4 pt-1">
										{rowError?.percent?.message && (
											<Text className="text-xs text-red-500">
												{rowError.percent.message as string}
											</Text>
										)}
									</View>
								</View>

								<View className="flex-[3]">
									<Controller
										control={control}
										name={`workers.${idx}.worker_id` as const}
										render={({ field: { onChange, value } }) => {
											const allWorkers = useWatch({ control, name: 'workers' })

											const selectedIds = allWorkers
												.map((w, i) => (i !== idx ? w.worker_id : null))
												.filter(Boolean)

											const availableWorkerOptions = workerOptions.filter(
												(opt) => !selectedIds.includes(opt.value),
											)

											return (
												<Dropdown
													IconLeft="list"
													IconRight="chevron-down"
													options={availableWorkerOptions}
													variant="outline"
													placeholder="Executor"
													value={
														value
															? availableWorkerOptions.find((opt) => opt.value === value)?.label ||
																''
															: ''
													}
													onChangeText={(selectedLabel) => {
														const selectedOption = availableWorkerOptions.find(
															(opt) => opt.label === selectedLabel,
														)
														onChange(selectedOption?.value || '')
													}}
													hasError={!!rowError?.worker}
												/>
											)
										}}
									/>
									<View className="h-4">
										{rowError?.worker?.message && (
											<Text className="text-xs text-red-500">
												{rowError.worker.message as string}
											</Text>
										)}
									</View>
								</View>

								<Pressable onPress={() => remove(idx)}>
									<Feather name="x" size={18} color="#374151" />
								</Pressable>
							</View>
						)
					})}

					{errors.workers?.root?.message && (
						<Text className="mt-2 text-red-500">{String(errors.workers.root.message)}</Text>
					)}
				</Card.Body>
			</Card>
		</View>
	)
}
