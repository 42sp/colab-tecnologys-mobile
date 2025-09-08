import { useState, useEffect } from 'react'
import * as ImageManipulator from 'expo-image-manipulator'

type ManipulateOptions = {
	image: string
	options: {
		width?: number
		height?: number
		rotate?: number
		compress?: number
		format: 'jpeg' | 'png' | 'webp'
	}
}

export function useImageManager() {
	const [error, setError] = useState<string | null>(null)
	const [manipulatedImage, setManipulatedImage] = useState<ManipulateOptions>({
		image: '',
		options: { format: 'jpeg' },
	})
	const manipulator = ImageManipulator.useImageManipulator(manipulatedImage.image)
	const [renderedImage, setRenderedImage] = useState<ImageManipulator.ImageResult | undefined>(undefined)

	useEffect(() => {
		if (manipulatedImage.image !== '') {
			performManipulation()
		}
	}, [manipulatedImage])

	const performManipulation = async () => {
		try {
			const resized = manipulator.resize(manipulatedImage.options)
			const rendered = await resized.renderAsync()
			const saved = await rendered.saveAsync({
				compress: manipulatedImage.options.compress,
				format: manipulatedImage.options.format.toLowerCase() as ImageManipulator.SaveFormat,
				base64: true,
			})
			setRenderedImage(saved)
			setError(null)
		} catch (err: any) {
			console.error('Erro ao manipular imagem:', err)
			setError('Erro ao processar imagem. Tente novamente.')
		}
	}

	return { setManipulatedImage, error, renderedImage }
}
