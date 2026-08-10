import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

/**
 * Magnetic pull effect on a button/link element.
 * Only activates on non-touch devices.
 * Returns a ref to attach to the element.
 */
export function useMagneticButton(strength = 0.35) {
    const ref = useRef(null)

    useEffect(() => {
        // Disable on touch devices
        if (!window.matchMedia('(pointer: fine)').matches) return
        const el = ref.current
        if (!el) return

        const onMove = e => {
            const r = el.getBoundingClientRect()
            const cx = r.left + r.width / 2
            const cy = r.top + r.height / 2
            const dx = (e.clientX - cx) * strength
            const dy = (e.clientY - cy) * strength
            gsap.to(el, { x: dx, y: dy, duration: 0.4, ease: 'power2.out' })
        }
        const onLeave = () => {
            gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1,0.5)' })
        }

        el.addEventListener('mousemove', onMove)
        el.addEventListener('mouseleave', onLeave)
        return () => {
            el.removeEventListener('mousemove', onMove)
            el.removeEventListener('mouseleave', onLeave)
            gsap.set(el, { x: 0, y: 0 })
        }
    }, [strength])

    return ref
}
