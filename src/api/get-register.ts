// import { api } from '@/libs/axios/axios'
// import { useSelector } from 'react-redux'
// import type { RootState } from '@/libs/redux/store'

// type RegisterGet = {
// 	name: string
// 	cpf: string
// 	phoneNumber: string
// }

// export async function getRegister(data: RegisterGet) {
// 	const { token } = useSelector((state: RootState) => state.auth)
// 	try {
// 		const response = await api.get(`/access`, {
// 			headers: {
// 				Authorization: `Bearer ${token}`,
// 			},
// 			data,
// 		})
// 		console.log(response.data)
// 		await new Promise((resolve) => setTimeout(resolve, 1000))
// 		return response.data.accessToken
// 	} catch (err) {
// 		console.log(err)
// 	}
// }
