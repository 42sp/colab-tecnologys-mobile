import { useEffect, useRef } from 'react'
import { View, Pressable, Text } from 'react-native'
import { Controller, useFieldArray, useWatch } from 'react-hook-form'
import Card from '@/components/ui/card'
import { Dropdown } from '@/components/ui/dropdown'
import { tarefeiros } from '@/mock'

const MAX_WORKERS = 4

const percentOptions = Array.from({ length: 11 }, (_, i) => {
	const v = i * 10
	return { label: `${v}%`, value: `${v}%` }
})

const workerOptions = tarefeiros.data.map((t) => ({
	label: t.name,
	value: String(t.id),
}))

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

export function WorkersForm({ control }: { control: any }) {
	const { fields, append, update, remove } = useFieldArray({
		control,
		name: 'workers',
		keyName: '_id',
	})

	const rows = useWatch({ control, name: 'workers' }) ?? []

	const didInit = useRef(false)
	useEffect(() => {
		if (!didInit.current && fields.length === 0) {
			didInit.current = true
			append({ percent: 100, worker: null })
		}
	}, [fields.length, append])

	function handleAdd() {
		if (fields.length >= MAX_WORKERS) return
		const nextLen = fields.length + 1
		const dist = distributeEvenly(nextLen)

		for (let i = 0; i < fields.length; i++) {
			update(i, { ...(rows?.[i] ?? {}), percent: dist[i] })
		}

		append({ percent: dist[nextLen - 1], worker: null })
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

				<Card.Body className="gap-2">
					{fields.map((f: any, idx: number) => (
						<View key={f._id} className="flex-row gap-2">
							<Controller
								control={control}
								name={`workers.${idx}.percent` as const}
								render={({ field: { onChange, value } }) => (
									<Dropdown
										IconRight={'chevron-down'}
										className="basis-2/5"
										options={percentOptions}
										variant="outline"
										placeholder="50%"
										value={value ? `${value}%` : ''}
										onChangeText={(v: any) =>
											onChange(parseInt(String(v).replace(/[^0-9]/g, ''), 10))
										}
									/>
								)}
							/>

							<Controller
								control={control}
								name={`workers.${idx}.worker` as const}
								render={({ field: { onChange, value } }) => (
									<Dropdown
										IconLeft={'list'}
										IconRight={'chevron-down'}
										className="basis-3/5"
										options={workerOptions}
										variant="outline"
										placeholder="worker"
										value={value}
										onChangeText={onChange}
									/>
								)}
							/>
						</View>
					))}
				</Card.Body>
			</Card>
		</View>
	)
}
