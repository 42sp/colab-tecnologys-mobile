import { Image, KeyboardAvoidingView, Platform, Text, View, Dimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SignInDivisor } from './sign-in-divisor'
import { Button } from '@/components/ui/button'
import { SignInForm } from './sign-in-form'
import { ScrollView } from 'react-native-gesture-handler'
import { LogModal } from '@/components/ui/log-modal'
import { useState } from 'react'

const { width, height } = Dimensions.get('window')

export default function SignInScreen() {
    const [modal, setModal] = useState<{
        visible: boolean
        description: string
    }>({
        visible: false,
        description: '',
    })

    function handleGoogle() {
        setModal({
            visible: true,
            description: 'Não foi possível entrar com o Google. Tente novamente mais tarde.',
        })
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1, backgroundColor: 'white' }}
            >
                <ScrollView
                    contentContainerStyle={{
                        flexGrow: 1,
                        justifyContent: 'center',
                        padding: 24,
                    }}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Image
                            source={require('@/assets/tecnologys-logo.png')}
                            style={{ alignSelf: 'center', marginBottom: 24, width: 180, height: 180, resizeMode: 'contain' }}
                        />

                        <View style={{ alignItems: 'center', marginBottom: 24 }}>
                            <Text style={{ fontFamily: 'Inter_700Bold', fontSize: 28 }}>Bem vindo ao Alvenatech</Text>
                            <Text style={{ marginTop: 8, textAlign: 'center', fontFamily: 'Inter_400Regular', fontSize: 16, color: '#6B7280' }}>
                                Faça login para continuar
                            </Text>
                        </View>

                        <SignInForm />

                        {/* Espaço para outros botões ou divisores, se necessário */}
                        {/* <SignInDivisor /> */}
                        {/* <Button title="Entrar com Google" onPress={handleGoogle} /> */}

                        <LogModal
                            visible={modal.visible}
                            description={modal.description}
                            onClose={() => setModal({ visible: false, description: '' })}
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}
