import * as SecureStore from 'expo-secure-store'

interface SaveItemType {
	key: string
	value: string
}

interface FindItemType {
	key: string
}

export async function saveAuthSecureStore(items: SaveItemType[]) {
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
	await Promise.all(items.map((item) => SecureStore.deleteItemAsync(item.key)))
}
