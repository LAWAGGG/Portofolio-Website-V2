import { useEffect } from 'react'
import { gsap } from 'gsap'

/*
 * Custom cursor driven by event DELEGATION on document — works in an SPA:
 * new elements mounted on page navigation are covered automatically
 * without re-binding anything.
 */
export function useCursor() {
    useEffect(() => {
        // Disable on touch devices
        if (!window.matchMedia('(pointer: fine)').matches) return

        const dot = document.getElementById('c-dot')
        const ring = document.getElementById('c-ring')
        const label = document.getElementById('c-label')
        if (!dot || !ring) return

        let mx = -200, my = -200, rx = -200, ry = -200, raf

        const onMove = e => { mx = e.clientX; my = e.clientY }

        const lerp = (a, b, t) => a + (b - a) * t
        const tick = () => {
            rx = lerp(rx, mx, 0.1); ry = lerp(ry, my, 0.1)
            dot.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`
            ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`
            if (label) label.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`
            raf = requestAnimationFrame(tick)
        }

        const setState = (state, text = '') => {
            document.body.setAttribute('data-cursor', state)
            if (label) label.textContent = text
        }

        const onOver = e => {
            const t = e.target.closest?.('[data-cursor-label]')
            if (t) { setState('label', t.getAttribute('data-cursor-label')); return }
            if (e.target.closest?.('a[href^="http"], a[target="_blank"]')) {
                setState('external', '↗'); return
            }
            if (e.target.closest?.('button, a:not([target="_blank"])')) { setState('hover'); return }
            setState('default')
        }

        window.addEventListener('mousemove', onMove)
        document.addEventListener('mouseover', onOver)
        raf = requestAnimationFrame(tick)

        return () => {
            window.removeEventListener('mousemove', onMove)
            document.removeEventListener('mouseover', onOver)
            cancelAnimationFrame(raf)
        }
    }, [])
}