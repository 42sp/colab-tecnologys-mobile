import useAxios from '@/hook/use-axios';

interface UploadResponse {
	id: string;
	uri: string;
	size: number;
	contentType: string;
}

export const usePostUploads = () => {
	const res = useAxios<UploadResponse>(
	  { url: 'uploads', method: 'post' },
	  { manual: true }
	)

	const upload = res.fetchData!

	return {
	  upload,
	  data: res.data,
	  loading: res.loading,
	  error: res.error,
	}
  }