import { useRouter } from 'expo-router'
import { Text, View } from 'react-native'
import { Button } from '../components/ui/MyButton'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Drawer } from 'expo-router/drawer'
import { Input } from '../components/ui/input'

export default function Register() {
  const router = useRouter()

    return (
        		<GestureHandlerRootView>
			<Drawer
				screenOptions={{
					drawerPosition: 'right',
					drawerHideStatusBarOnOpen: true,
				}}
			>
			</Drawer>
		
		
            <View className="h-full items-center justify-center">
                    <Text className="flex self-center text-xl">Register</Text>
                    <Text>Nome completo</Text>
                    <Input
                        placeholder="Seu nome completo"
                        IconLeft={'user'}
                        className="self-center"
                    />
                    <Text>E-mail</Text>
                    <Input
                        placeholder="seu-email@email.com"
                        IconLeft={'mail'}
                        className="self-center"
                    />
                    <Text>CPF</Text>
                    <Input
                        placeholder="000.000.000-00"
                        IconLeft={'file'}
                        className="self-center"
                    />
                    <Text>Função</Text>
                    <Input
                        placeholder="DROP DOWN MENU"
                        IconLeft={'user'}
                        className="self-center"
                    />
                    <Input
                        placeholder="Seu nome completo"
                        IconLeft={'user'}
                        className="self-center"
                    />
                    <Input
                        placeholder="Seu nome completo"
                        IconLeft={'user'}
                        className="self-center"
                    />
                    <Input
                        placeholder="Seu nome completo"
                        IconLeft={'user'}
                        className="self-center"
                    />
                <Button title="Go to Main" onPress={() => router.navigate('/main')} buttonType='primary'/>
            </View>
            
      </GestureHandlerRootView>
    )
}
