import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger)

/**
 * Mask-reveal heading — words slide up from clip mask
 * @param {React.RefObject} ref  — container ref
 * @param {string} selector      — CSS selector for headings inside container
 */
export function useMaskReveal(ref, selector = '.reveal-heading') {
    useEffect(() => {
        if (!ref.current) return
        const ctx = gsap.context(() => {
            const els = ref.current.querySelectorAll(selector)
            els.forEach(el => {
                const split = new SplitType(el, { types: 'words' })
                // Wrap each word in a clip container
                split.words.forEach(w => {
                    const wrapper = document.createElement('span')
                    wrapper.style.cssText = 'display:inline-block;overflow:hidden;vertical-align:bottom;margin-right:0.3em'
                    w.parentNode.insertBefore(wrapper, w)
                    wrapper.appendChild(w)
                    w.style.display = 'inline-block'
                })
                gsap.from(split.words, {
                    // immediateRender:false keeps words visible until the trigger
                    // actually fires, so a misfired/missed trigger can never leave
                    // a heading stuck hidden (fixes intermittent blank sections).
                    scrollTrigger: { trigger: el, start: 'top 90%', once: true, immediateRender: false },
                    y: '105%',
                    duration: 0.75,
                    stagger: 0.06,
                    ease: 'power3.out',
                })
            })
        }, ref)
        return () => ctx.revert()
    }, [ref, selector])
}

/**
 * Staggered fade-up for blocks
 */
export function useFadeUp(ref, selector = '.fade-up', stagger = 0.1, start = 'top 85%') {
    useEffect(() => {
        if (!ref.current) return
        const ctx = gsap.context(() => {
            gsap.from(ref.current.querySelectorAll(selector), {
                // immediateRender:false — elements stay visible until their scroll
                // trigger actually plays; a missed trigger leaves content visible.
                scrollTrigger: { trigger: ref.current, start, once: true, immediateRender: false },
                y: 32, opacity: 0, duration: 0.65, stagger, ease: 'power2.out',
            })
        }, ref)
        return () => ctx.revert()
    }, [ref, selector, stagger, start])
}
