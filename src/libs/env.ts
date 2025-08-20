import { z } from 'zod'
import { EXPO_PUBLIC_API_URL } from '@env'

const envScheme = z.object({
    EXPO_PUBLIC_API_URL: z.string().url()
})

export const env = envScheme.parse({ EXPO_PUBLIC_API_URL })