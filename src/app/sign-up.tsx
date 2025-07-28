import { useRouter } from 'expo-router'
import { Text, View } from 'react-native'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Dropdown } from '../components/ui/dropdown'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'


 const data = [
     { label: 'Item 1' },
     { label: 'Item 2' },
     { label: 'Item 3' },
     { label: 'Item 4' },
 ]

export default function SignUp() {
  const router = useRouter()

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} className="bg-white">
        <SafeAreaProvider>
        <SafeAreaView className='my-5 p-10 bg-white'>
            <View className="h-full items-center justify-between gap-5 " >
                <View className='gap-1'>
                    <Text>Full name</Text>
                    <Input
                        placeholder="Type your full name"
                        IconLeft={'user'}
                        className="self-center"
                    />
                </View>
                <View className='gap-1'>
                    <Text>E-mail</Text>
                    <Input
                        placeholder="your-email@email.com"
                        IconLeft={'mail'}
                        className="self-center"
                    />
                </View>
                <View className='gap-1'>
                    <Text>CPF</Text>
                    <Input
                        placeholder="000.000.000-00"
                        IconLeft={'file'}
                        className="self-center"
                    />
                </View>
                <View className='gap-1'>
                    <Text>Phone number</Text>
                    <Input
                        placeholder="(00) 00000 0000"
                        IconLeft={'phone'}
                        className="self-center"
                    />
                </View>
                <View className='gap-1'>
                    <Text>Job title</Text>
                    <Dropdown
                        IconLeft={'briefcase'}
                        IconRight={'chevron-down'}
                        className="self-center"
                        options={data}
                        variant='outline'
                        placeholder='Select an option'

                    />
                </View>
                <View className='gap-1'>
                    <Text>Password</Text>
                    <Input
                        placeholder="Type your password"
                        IconLeft={'lock'}
                        IconRight={'eye'}
                        className="self-center"
                    />
                </View>
                <View className='gap-1'>
                    <Text>Confirm password</Text>
                    <Input
                        placeholder="Confirm your password"
                        IconLeft={'lock'}
                        IconRight={'eye'}
                        className="self-center"
                    />
                </View>
              
                    <Button
                    title="Create account"
                    onPress={() => router.navigate('/sign-in')}
                    className="my-5"/>
               <View className='py-5'>
                    <Text>Already have an account? 
                        <Text onPress={() => router.navigate('sign-in')}className='font-inter-bold text-blue-500'> Sign in</Text>
                    </Text>
                </View>
            </View>
            </SafeAreaView>
            </SafeAreaProvider>
        </ScrollView>
    )
}
