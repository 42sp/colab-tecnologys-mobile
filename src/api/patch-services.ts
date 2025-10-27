import { api } from '@/libs/axios/axios'

export interface PatchServicesProps {
	id?: string;
	is_active?: boolean;
	is_done?: boolean;
}

export interface PatchServicesResponse {

}

export async function patchServices({ id, ...props }: PatchServicesProps) {
	const response = await api.patch(`/services/${id}`, { ...props })
	return response.data
}