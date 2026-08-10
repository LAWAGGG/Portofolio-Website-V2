import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Creates a single Lenis instance per Layout mount and hands it back via a ref
 * so other parts (e.g. ScrollToTop) can drive it programmatically.
 */
export function useLenis() {
    const lenisRef = useRef(null)

    useEffect(() => {
        let lenis
        const init = async () => {
            const { default: Lenis } = await import('lenis')
            lenis = new Lenis({
                duration: 1.4,
                easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            })
            lenisRef.current = lenis
            window.__lenis = lenis

            lenis.on('scroll', ScrollTrigger.update)

            const ticker = (time) => lenis.raf(time * 1000)
            gsap.ticker.add(ticker)
            gsap.ticker.lagSmoothing(0)

            let resizeTimer
            const onResize = () => {
                clearTimeout(resizeTimer)
                resizeTimer = setTimeout(() => ScrollTrigger.refresh(), 200)
            }
            window.addEventListener('resize', onResize, { passive: true })

            lenis.__cleanup = () => {
                window.removeEventListener('resize', onResize)
                gsap.ticker.remove(ticker)
                lenis.destroy()
            }
        }
        init()

        return () => {
            lenis?.__cleanup?.()
            lenisRef.current = null
            window.__lenis = null
        }
    }, [])

    return lenisRef
}