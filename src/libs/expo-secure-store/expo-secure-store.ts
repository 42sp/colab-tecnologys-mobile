import * as SecureStore from 'expo-secure-store'
import { setAuth } from '../redux/auth/auth-slice'
import store from '../redux/store'

interface SaveItemType {
	key: string
	value: string
}

interface FindItemType {
	key: string
}

export async function saveAuthSecureStore(items: SaveItemType[]) {
	store.dispatch(setAuth(items[0].value))
	await Promise.all(items.map((item) => SecureStore.setItemAsync(item.key, item.value)))
}

export async function getAuthSecureStore(items: FindItemType[]) {
	const results = await Promise.all(items.map((item) => SecureStore.getItemAsync(item.key)))

	let nullValues = 0
	for (let i = 0; i < items.length; i++) {
		const value = results[i]
		if (value === null) {
			nullValues++
		}
	}
	if (nullValues === items.length) {
		throw new Error('Não há dados de autenticação guardados no SecureStore')
	} else if (nullValues > 0) {
		throw new Error('Uma key não foi encontrada no SecureStore')
	}

	return items.map((item, i) => ({ key: item.key, value: results[i]! }))
}

export async function deleteAuthSecureStore(items: FindItemType[]) {
	try {
		for (const item of items) {
			const value = await SecureStore.getItemAsync(item.key)
			console.log(`Valor antes de deletar a key ${item.key}: `, value)
			await SecureStore.deleteItemAsync(item.key)
		}
	} catch (e) {
		console.log(e)
	}

	return true
}
