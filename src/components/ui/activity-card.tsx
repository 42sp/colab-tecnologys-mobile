import React from 'react'
import { Text, View } from 'react-native'
import Card from '@/components/ui/card'
import { Feather } from '@expo/vector-icons'
import { Button } from '@/components/ui/button'

// type LocationType = 'unit' | 'building'

// interface ActivityData {
//   title: string
//   location: string
//   locationType: LocationType
//   employee: string
//   time: Date
// }

// interface Props {
//   data: ActivityData
// }

type IconLocationVariant = 'unidade' | 'predio'

const IconLocationVariants: Record<IconLocationVariant, { icon: keyof typeof Feather.glyphMap }> = {
	unidade: {
		icon: "home"
	},
	predio: {
		icon: "trello"
	},
}

type IconJobVariant = 'parede' | 'contrapiso' | 'pintura'

const IconJobVariants: Record<IconJobVariant, { icon: keyof typeof Feather.glyphMap }> = {
  parede: {
    icon: "credit-card"
  },
  contrapiso: {
    icon: "plus-square"
  },
  pintura: {
    icon: "droplet"
  }
}

interface ActivityCardProps {
	data: {
		title: string
    jobType: IconJobVariant
		location: string
		locationType: IconLocationVariant
		employee: string
		time: Date
	}
}

export function ActivityCard({ data }: ActivityCardProps) {
	return (
		<Card>
			<Card.Header className="flex-row items-start justify-between ">
				<View className="flex-1 flex-row items-center gap-4">
					<Button variant="rounded" className="bg-blue-100 size-10">
						<Feather
              name={IconJobVariants[data.jobType].icon}
              size={14}
             color={'black'} />
					</Button>
					<Text className="font-inter-bold text-md ">{data.title}</Text>
				</View>
				<View>
					{data.time ? (
						<Text className="font-inter text-xs">
							{data.time.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
						</Text>
					) : (
						<Text className="font-inter text-xs">00:00</Text>
					)}
				</View>
			</Card.Header>
			<Card.Body className="border border-white ml-14 gap-1">
			  <View className="flex-row gap-2">
          <Feather
            name={IconLocationVariants[data.locationType].icon}
            size={14}
            color="black"
          />
          <Text className=" flex-1 text-sm font-inter text-wrap">{data.location}</Text>
        </View>
			  <View className="flex-row gap-2">
          <Feather
            name={"user"}
            size={14}
            color="black"
          />
          <Text className="text-sm font-inter text-wrap flex-1">{data.employee}</Text>
        </View>
			</Card.Body>
		</Card>
	)
}
