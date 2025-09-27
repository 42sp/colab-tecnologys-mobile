import Constants from 'expo-constants'

const extra = Constants.expoConfig?.extra as { API_URL?: string } | undefined

export const API_URL = extra?.API_URL ?? ''