import { useEffect } from 'react'

/**
 * Shared modal behavior: locks page scroll (Lenis) while open and
 * closes on Escape. Pass [open, onClose].
 */
export function useModal(open, onClose) {
    useEffect(() => {
        if (!open) return
        window.__lenis?.stop()
        const onKey = e => e.key === 'Escape' && onClose()
        window.addEventListener('keydown', onKey)
        return () => {
            window.__lenis?.start()
            window.removeEventListener('keydown', onKey)
        }
    }, [open, onClose])
}