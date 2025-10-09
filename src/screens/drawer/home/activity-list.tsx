import { SectionList, Text, View, StyleSheet, Animated, RefreshControl } from 'react-native'
import { ActivityCard } from './activity-card'
import { Task } from '@/api/get-tasks'
import { useCallback, useEffect, useMemo, useRef } from 'react'

const ColorDotVariants: Record<'Alvenaria' | 'Contrapiso' | 'Pintura', { color: string }> = {
	Alvenaria: {
		color: 'bg-blue-500',
	},
	Contrapiso: {
		color: 'bg-red-500',
	},
	Pintura: {
		color: 'bg-amber-500',
	},
}

type Item = { id: string; service_type: string /* ...outros campos do item... */ }
type Section = { title: string; data: Item[] }

type Props = {
	data: Section[]
	HeaderComponent?: React.ReactElement | React.ComponentType<any> | null
	className?: string
	/** mostra skeleton por cima no 1º load (lista continua montada) */
	firstLoad?: boolean
	/** spinner nativo de pull-to-refresh */
	refreshing?: boolean
	onRefresh?: () => void
	/** overlay leve durante um refetch em background */
	refetching?: boolean
	/** render opcional para skeleton de primeiro load */
	FirstLoadOverlay?: React.ReactElement
}

interface ActivityListProps {
	data: { title: string; data: Task[] }[]
	className?: string
	HeaderComponent?: React.ReactNode
}

export function ActivityList({
	data,
	HeaderComponent,
	className = '',
	firstLoad = false,
	refreshing = false,
	onRefresh,
	refetching = false,
	FirstLoadOverlay,
}: Props) {
	// animação do overlay "refetching"
	const refetchOpacity = useRef(new Animated.Value(0)).current
	useEffect(() => {
		Animated.timing(refetchOpacity, {
			toValue: refetching ? 1 : 0,
			duration: 160,
			useNativeDriver: true,
		}).start()
	}, [refetching, refetchOpacity])

	// memoizações para evitar recriar funções a cada render
	const keyExtractor = useCallback((item: Item) => String(item.id), [])
	const renderSectionHeader = useCallback(
		({ section }: { section: Section }) => (
			<Text className="py-3 font-inter text-neutral-600">{section.title}</Text>
		),
		[],
	)

	const renderItem = useCallback(
		({ item, onRefresh }: { item: Item; onRefresh: () => Promise<void> }) => {
			const colorDot =
				// @ts-ignore
				ColorDotVariants[item.service_type as keyof typeof ColorDotVariants]?.color || 'bg-gray-500'

			return (
				<View className="w-full flex-row">
					<View className="ml-3 items-center">
						<View className={`h-3 w-3 rounded-full bg-blue-500 ${colorDot}`} />
						<View className="w-0.5 flex-1 bg-gray-400" />
					</View>
					<View className="mb-2 ml-2 flex-1">
						<ActivityCard {...item} onRefresh={onRefresh} />
					</View>
				</View>
			)
		},
		[],
	)

	// evita recriar o array "sections" se vier igual
	//const sections = useMemo(() => data ?? [], [data])

	return (
		<View className={`w-full flex-1 ${className}`} style={{ position: 'relative' }}>
			<SectionList
				sections={data}
				keyExtractor={keyExtractor}
				renderItem={({ item }) =>
					renderItem({
						item,
						onRefresh: onRefresh
							? async () => {
									onRefresh()
								}
							: async () => {},
					})
				}
				renderSectionHeader={renderSectionHeader}
				// ✅ Passe o elemento ou componente diretamente (não como função que retorna)
				ListHeaderComponent={HeaderComponent as any}
				scrollEnabled
				showsVerticalScrollIndicator={false}
				// 🔧 Virtualização / performance
				initialNumToRender={12}
				maxToRenderPerBatch={8}
				windowSize={7}
				removeClippedSubviews
				stickySectionHeadersEnabled={false}
				// ✅ Mantém a lista visível enquanto atualiza
				refreshControl={
					onRefresh ? (
						<RefreshControl
							refreshing={refreshing}
							onRefresh={onRefresh}
							tintColor="#666"
							colors={['#666']}
						/>
					) : undefined
				}
				// se tiver alturas fixas para itens/headers, implemente getItemLayout para pular medições
			/>

			{/* Overlay leve para refetch em background (não bloqueia toques) */}
		</View>
	)
}
