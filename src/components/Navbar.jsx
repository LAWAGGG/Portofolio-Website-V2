import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollProgress } from '../hooks/useScrollProgress'

const links = [
    { label: 'Home', to: '/', id: '/', end: true },
    { label: 'About', to: '/about', id: '/about', end: true },
    { label: 'Projects', to: '/projects', id: '/projects', end: true },
    { label: 'Achievements', to: '/achievement', id: '/achievement', end: true },
]

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [hidden, setHidden] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const lastY = useRef(0)
    const { pathname } = useLocation()

    useScrollProgress('#scroll-progress')

    // Lock page scroll while the mobile menu is open
    useEffect(() => {
        if (menuOpen) window.__lenis?.stop()
        else window.__lenis?.start()
        return () => window.__lenis?.start()
    }, [menuOpen])

    // Reset nav visual state whenever the route changes
    useEffect(() => {
        setHidden(false)
        setMenuOpen(false)
        setScrolled(window.scrollY > 48)
        lastY.current = 0
    }, [pathname])

    useEffect(() => {
        const onScroll = () => {
            const y = window.scrollY
            setScrolled(y > 48)
            // Hide on scroll down, show on scroll up
            if (y > lastY.current + 8 && y > 120) setHidden(true)
            if (y < lastY.current - 8) setHidden(false)
            lastY.current = y
        }
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const isActive = to => (to === '/' ? pathname === '/' : pathname.startsWith(to))

    return (
        <motion.header
            initial={{ y: -64, opacity: 0 }}
            animate={{ y: hidden ? -80 : 0, opacity: 1 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed top-0 left-0 right-0 z-50 transition-[background,border-color] duration-500 ${scrolled || menuOpen ? 'bg-bg/90 backdrop-blur-xl border-b border-border' : 'bg-transparent'
                }`}
            style={{ willChange: 'transform' }}
        >
            {/* Scroll progress bar — top edge */}
            <div
                id="scroll-progress"
                className="absolute top-0 left-0 right-0 h-[2px] bg-accent origin-left"
                style={{ transform: 'scaleX(0)', zIndex: 60 }}
            />

            <div className="max-w-7xl mx-auto px-6 md:px-10 h-14 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="font-display font-bold text-lg tracking-tightest group">
                    {/* <span className="text-accent group-hover:opacity-80 transition-opacity">AF</span> */}
                    <img src="/images/logo.png" className='w-10 h-50' alt="" />
                </Link>

                {/* Desktop nav */}
                <nav className="hidden md:flex items-center gap-1">
                    {links.map(l => (
                        <NavLink
                            key={l.to}
                            to={l.to}
                            end={l.end}
                            className={`relative font-mono text-[11px] tracking-widest uppercase px-4 py-2 transition-colors duration-200 ${isActive(l.to) ? 'text-fg' : 'text-dim hover:text-fg'
                                }`}
                        >
                            {isActive(l.to) && (
                                <motion.span
                                    layoutId="nav-active"
                                    className="absolute inset-0 border-b border-accent"
                                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                />
                            )}
                            {l.label}
                        </NavLink>
                    ))}
                </nav>

                {/* Mobile hamburger */}
                <button
                    className="md:hidden flex flex-col gap-1.5 p-2"
                    onClick={() => setMenuOpen(v => !v)}
                    aria-label="Toggle navigation"
                >
                    {[0, 1, 2].map(i => (
                        <span key={i} className={`block h-px bg-fg transition-all duration-300 ${i === 0 ? `w-6 ${menuOpen ? 'rotate-45 translate-y-2' : ''}` :
                                i === 1 ? `w-4 ml-auto ${menuOpen ? 'opacity-0 w-0' : ''}` :
                                    `w-6 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`
                            }`} />
                    ))}
                </button>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="md:hidden overflow-hidden bg-bg/90 backdrop-blur-xl border-b border-border"
                    >
                        <div className="px-6 py-4 flex flex-col gap-1">
                            {links.map(l => (
                                <NavLink key={l.to} to={l.to} end={l.end}
                                    onClick={() => setMenuOpen(false)}
className={`font-mono text-xs tracking-widest uppercase py-2.5 px-3 border-b border-border/50 last:border-0 transition-colors ${isActive(l.to) ? 'text-accent bg-surface/40' : 'text-dim hover:text-fg'
                                    }`}>
                                    {l.label}
                                </NavLink>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    )
}