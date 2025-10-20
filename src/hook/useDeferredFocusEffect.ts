// useDeferredFocusEffect.ts
import { useCallback } from 'react'
import { InteractionManager } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'

type EffectCtx = {
	/** true enquanto a tela estiver focada e o efeito não tiver sido limpo */
	isActive: () => boolean
	/** pode ser repassado para fetch/axios e cancelar a request */
	signal: AbortSignal
}

type Options = {
	/** atraso extra opcional após o fim das interações (ms) */
	delay?: number
	/** log de erros do efeito (por padrão silencia) */
	onError?: (err: unknown) => void
}

/**
 * Executa o efeito somente DEPOIS das animações/gestos (runAfterInteractions)
 * sempre que a tela entra em foco. Cancela ao desfocar/desmontar.
 */
export function useDeferredFocusEffect(
	effect: (ctx: EffectCtx) => void | Promise<void>,
	deps: React.DependencyList = [],
	options: Options = {},
) {
	useFocusEffect(
		useCallback(() => {
			let active = true
			const controller = new AbortController()

			const run = async () => {
				try {
					await effect({ isActive: () => active, signal: controller.signal })
				} catch (err) {
					options.onError?.(err)
				}
			}

			const schedule = () => {
				if (options.delay && options.delay > 0) {
					const t = setTimeout(() => active && !controller.signal.aborted && run(), options.delay)
					controller.signal.addEventListener('abort', () => clearTimeout(t))
				} else {
					run()
				}
			}

			const handle = InteractionManager.runAfterInteractions(schedule)

			return () => {
				active = false
				controller.abort()
				handle.cancel?.()
			}
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, deps),
	)
}
