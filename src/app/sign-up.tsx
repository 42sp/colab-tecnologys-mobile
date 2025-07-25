import { useRouter } from 'expo-router'
import { Text, View } from 'react-native'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
//import { Dropdown } from '../components/ui/dropdown'
import { Dropdown } from 'react-native-element-dropdown'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState } from 'react'

const data = [
    { label: 'Item 1' },
    { label: 'Item 2' },
    { label: 'Item 3' },
    { label: 'Item 4' },
]

export default function SignUp() {
  const router = useRouter()
  const [value, setValue] = useState(null)

    return (
        <SafeAreaView className='my-5 gap 5 p-10'>
            <View className="h-full items-center justify-between" >
                <View>
                    <Text>Nome completo</Text>
                    <Input
                        placeholder="Seu nome completo"
                        IconLeft={'user'}
                        className="self-center"
                    />
                </View>
                <View>
                    <Text>E-mail</Text>
                    <Input
                        placeholder="seu-email@email.com"
                        IconLeft={'mail'}
                        className="self-center"
                    />
                </View>
                <View>
                    <Text>CPF</Text>
                    <Input
                        placeholder="000.000.000-00"
                        IconLeft={'file'}
                        className="self-center"
                    />
                </View>
                <View>
                    <Text>Telefone</Text>
                    <Input
                        placeholder="(00) 00000 0000"
                        IconLeft={'phone'}
                        className="self-center"
                    />
                </View>
                <View>
                    <Text>Função</Text>
                    <View className='flex h-14 w-96 flex-row items-center justify-between gap-3 rounded-lg border border-neutral-300 px-4 text-neutral-700'>
                    <Dropdown
                        placeholder='Selecione sua função'
                        data={data}
                        labelField="label"
                        valueField="value"
                        value={value}
                        onChange={item => {
                            setValue(item.value);
                        }}
                    />
                    </View>
                </View>
                <View>
                    <Text>Senha</Text>
                    <Input
                        placeholder="Digite sua senha"
                        IconLeft={'lock'}
                        IconRight={'eye'}
                        className="self-center"
                    />
                </View>
                <View>
                    <Text>Confirmar senha</Text>
                    <Input
                        placeholder="Confirme sua senha"
                        IconLeft={'lock'}
                        IconRight={'eye'}
                        className="self-center"
                    />
                </View>
                <View>
                    <Button
                    title="Criar conta"
                    onPress={() => router.navigate('/sign-in')}
                    className="my-5"/>
                </View>
                <View>
                    <Text>Já tem uma conta? 
                            <Text onPress={() => router.navigate('sign-in')}className='font-inter-bold text-blue-500'> Entrar</Text>
                    </Text>
                </View>
            </View>
            
      </SafeAreaView>
    )
}
