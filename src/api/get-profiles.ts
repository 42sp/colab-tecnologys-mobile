import { api } from "@/libs/axios/axios"

export async function getProfiles() {
	let response = await api.get(`/profile`);

	return response.data
}