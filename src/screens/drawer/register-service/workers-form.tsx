import { View, Pressable, Text } from 'react-native'
import { Controller, FieldErrors, useFieldArray, useWatch, type Control } from 'react-hook-form'
import type { RegisterServiceType } from '@/screens/drawer/register-service/register-service'
import Card from '@/components/ui/card'
import { Dropdown } from '@/components/ui/dropdown'
import { tarefeiros } from '@/mock'
import { Feather } from '@expo/vector-icons'

type Props = {
	control: Control<RegisterServiceType>
	errors: FieldErrors<RegisterServiceType>
}

const MAX_WORKERS = 4

const percentOptions = Array.from({ length: 11 }, (_, i) => {
	const v = i * 10
	return { label: `${v}%`, value: `${v}%` }
})

const workerOptions = tarefeiros.data.map((t) => ({	label: t.name,}))

function distributeEvenly(n: number) {
	if (n <= 0) return [] as number[]
	const base = Math.floor(100 / n)
	let rest = 100 - base * n
	const arr = Array.from({ length: n }, () => base)
	let i = 0
	while (rest > 0) {
		arr[i % n] += 1
		rest--
		i++
	}
	return arr
}

export function WorkersForm({ control, errors }: Props) {
	const { fields, append, update, remove } = useFieldArray({
		control,
		name: 'workers',
		keyName: '_id',
	})

	const rows = useWatch({ control, name: 'workers' }) ?? []

	function handleAdd() {
		if (fields.length >= MAX_WORKERS) return
		const nextLen = fields.length + 1
		const dist = distributeEvenly(nextLen)

		for (let i = 0; i < fields.length; i++) {
			update(i, { ...(rows?.[i] ?? {}), percent: dist[i] })
		}

		append({ percent: dist[nextLen - 1], worker: '' })
	}

	return (
		<View>
			<Card className="ml-6 mr-6 mt-6">
				<Card.Header className="mb-1 flex-row items-center justify-between">
					<Text className="font-inter-bold text-xl text-black">Workers</Text>
					<Pressable
						onPress={handleAdd}
						className="h-9 items-center justify-center rounded-lg border-2 border-gray-200 px-3 disabled:opacity-40"
						disabled={fields.length >= MAX_WORKERS}
					>
						<Text className="w-[135px] text-center text-xl text-gray-700">Add</Text>
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
										name={`workers.${idx}.worker` as const}
										render={({ field: { onChange, value } }) => (
											<Dropdown
												IconLeft={'list'}
												IconRight={'chevron-down'}
												options={workerOptions}
												variant="outline"
												placeholder="worker"
												value={value}
												onChangeText={onChange}
												hasError={!!rowError?.worker}
											/>
										)}
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
