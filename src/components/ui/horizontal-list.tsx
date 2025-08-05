import { ScrollView } from 'react-native'
import { Button } from '@/components/ui/button'

interface Props {
  options: string[]
  selected: string
  onSelect: (value: string) => void
}

export function HorizontalList({ options, selected, onSelect }: Props) {

  return (
    <ScrollView
      horizontal
      pagingEnabled={false}
      nestedScrollEnabled
      showsHorizontalScrollIndicator={false}
      className="pr-4"
      contentContainerStyle={{ gap: 4 }}
    >
      {options.map((option) => (
        <Button
          key={option}
          title={option}
          variant={'pill'}
          className={selected === option ? 'bg-black ' : 'bg-gray-200 '}
          textClassName={selected === option ? 'text-white' : 'text-black'}
          onPress={() => onSelect(option)}
        />
      ))}
    </ScrollView>
  )
}
