import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLenis } from '../hooks/useLenis'
import { useCursor } from '../hooks/useCursor'
import Loader from '../components/Loader'
import Cursor from '../components/Cursor'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

gsap.registerPlugin(ScrollTrigger)

/* Scroll reset to top on every route change, synced with Lenis */
function ScrollToTop({ lenisRef }) {
    const { pathname } = useLocation()
    useEffect(() => {
        window.scrollTo(0, 0)
        lenisRef.current?.scrollTo(0, { immediate: true, force: true })
    }, [pathname, lenisRef])
    return null
}

/* Recalibrate ScrollTrigger after each page swap (defensive) */
function RefreshTriggers() {
    const { pathname } = useLocation()
    useEffect(() => {
        const raf = requestAnimationFrame(() => ScrollTrigger.refresh())
        return () => cancelAnimationFrame(raf)
    }, [pathname])
    return null
}

export default function Layout() {
    const [loaded, setLoaded] = useState(false)
    const lenisRef = useLenis()
    useCursor()

    // Same loader bar/curtain as the original single-page mount
    useEffect(() => {
        const bar = document.getElementById('loader-bar')
        const loader = document.getElementById('loader')
        const ctTop = document.getElementById('loader-curtain-top')
        const ctBot = document.getElementById('loader-curtain-bot')
        if (!bar || !loader) return

        let p = 0
        const iv = setInterval(() => {
            p = Math.min(p + Math.random() * 16 + 4, 100)
            bar.style.width = p + '%'

            if (p >= 100) {
                clearInterval(iv)
                const tl = gsap.timeline({
                    delay: 0.15,
                    onComplete: () => {
                        loader.style.display = 'none'
                        setLoaded(true)
                        requestAnimationFrame(() => {
                            requestAnimationFrame(() => ScrollTrigger.refresh())
                        })
                    },
                })

                if (ctTop && ctBot) {
                    tl.to(ctTop, { scaleY: 0, duration: 0.55, ease: 'power3.inOut' }, 0)
                        .to(ctBot, { scaleY: 0, duration: 0.55, ease: 'power3.inOut' }, 0)
                        .to('#loader-name, #loader-bar-track, #loader-label', { opacity: 0, duration: 0.2 }, 0)
                } else {
                    tl.to(loader, { opacity: 0, duration: 0.45 })
                }
            }
        }, 55)

        return () => clearInterval(iv)
    }, [])

    return (
        <MotionConfig reducedMotion="user">
            <Loader />
            <Cursor />
            {loaded && (
                <div>
                    <ScrollToTop lenisRef={lenisRef} />
                    <RefreshTriggers />
                    <Navbar />
                    <main>
                        <Outlet />
                    </main>
                    <Footer />
                </div>
            )}
        </MotionConfig>
    )
}