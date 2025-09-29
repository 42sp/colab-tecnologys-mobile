import { z } from 'zod'

const envScheme = z.object({
	API_URL: z.string(),
})

const { data, error } = envScheme.safeParse(process.env)

if (error) {
	throw new Error(`Invalid env variables: ${error.message}`)
}

export const env = data
