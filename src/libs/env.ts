import { z } from 'zod'
import { API_URL } from '@env'

const envScheme = z.object({
    API_URL: z.string().url()
})

export const env = envScheme.parse({API_URL})