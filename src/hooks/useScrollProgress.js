import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Drives a DOM element's scaleX (0→1) based on overall page scroll progress.
 * @param {string} selector — CSS selector for the progress bar element
 */
export function useScrollProgress(selector = '#scroll-progress') {
    useEffect(() => {
        const bar = document.querySelector(selector)
        if (!bar) return

        const st = ScrollTrigger.create({
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            onUpdate: self => {
                gsap.set(bar, { scaleX: self.progress, transformOrigin: 'left center' })
            },
        })

        return () => st.kill()
    }, [selector])
}
