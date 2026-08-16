import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { ArrowDownRight, Github } from 'lucide-react'
import SplitType from 'split-type'
import { useMagneticButton } from '../hooks/useMagneticButton'
import AsciiArt from '../components/AsciiArt'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
    const sectionRef = useRef(null)
    const layerBgRef = useRef(null)   // slowest parallax — grid
    const layerMidRef = useRef(null)   // medium — coordinate badge
    const layerFgRef = useRef(null)   // fastest — accent dot

    const btnProjectsRef = useMagneticButton(0.4)
    const btnGithubRef = useMagneticButton(0.3)

    // Framer mouse parallax values
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)
    const bgMoveX = useTransform(mouseX, [-1, 1], [-12, 12])
    const bgMoveY = useTransform(mouseY, [-1, 1], [-8, 8])
    const fgMoveX = useTransform(mouseX, [-1, 1], [18, -18])
    const fgMoveY = useTransform(mouseY, [-1, 1], [12, -12])

    useEffect(() => {
        const section = sectionRef.current
        if (!section) return

        // Mouse parallax — normalized -1 to 1
        const onMove = e => {
            const r = section.getBoundingClientRect()
            mouseX.set(((e.clientX - r.left) / r.width - 0.5) * 2)
            mouseY.set(((e.clientY - r.top) / r.height - 0.5) * 2)
        }
        section.addEventListener('mousemove', onMove)

        // Entrance: split text reveal
        const ctx = gsap.context(() => {
            const line1 = new SplitType('.hero-line1', { types: 'chars' })
            const line2 = new SplitType('.hero-line2', { types: 'chars' })

            gsap.set(['.hero-eyebrow', '.hero-sub', '.hero-ctas', '.hero-stats'], { opacity: 0, y: 20 })

            const tl = gsap.timeline({ delay: 0.1 })
            tl.from(line1.chars, { y: '110%', duration: 0.7, stagger: 0.025, ease: 'power3.out' }, 0)
                .from(line2.chars, { y: '110%', duration: 0.7, stagger: 0.025, ease: 'power3.out' }, 0.1)
                .to('.hero-eyebrow', { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' }, 0.35)
                .to('.hero-sub', { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' }, 0.5)
                .to('.hero-ctas', { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' }, 0.65)
                .to('.hero-stats', { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' }, 0.8)

            // Multi-layer scroll parallax — GSAP scrub
            // Layer BG (grid) — very slow
            gsap.to(layerBgRef.current, {
                scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: true },
                y: '15%', ease: 'none',
            })
            // Layer mid (coordinate) — medium
            gsap.to(layerMidRef.current, {
                scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: 1.5 },
                y: '-30%', opacity: 0, ease: 'none',
            })
            // Layer fg (accent shape) — fast, opposite
            gsap.to(layerFgRef.current, {
                scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: 0.5 },
                y: '-60%', ease: 'none',
            })
            // Text exits on scroll
            gsap.to('.hero-content', {
                scrollTrigger: { trigger: section, start: 'top top', end: '40% top', scrub: 1 },
                y: 60, opacity: 0, ease: 'none',
            })

        }, section)

        return () => {
            ctx.revert()
            section.removeEventListener('mousemove', onMove)
        }
    }, [])

    return (
        <section
            id="hero"
            ref={sectionRef}
            className="relative min-h-[100dvh] flex flex-col justify-end pb-14 pt-28 overflow-hidden"
        >
            {/* ASCII bg video — darkened overlay so text stays readable */}
            <div className="absolute inset-0 pointer-events-none">
                <AsciiArt className="h-full w-full" />
                <div className="absolute inset-0 bg-[#0d1117]/70" />
            </div>

           

            {/* Section index — back layer */}
            <div className="absolute bottom-0 right-0 section-index leading-none pr-2 select-none">00</div>

            {/* Main content */}
            <div className="hero-content max-w-7xl mx-auto px-6 md:px-10 w-full relative z-10">

                {/* Name — each line has overflow:hidden for mask effect */}
                <h1 className="font-display font-bold leading-[0.92] tracking-tightest mb-7"
                    style={{ fontSize: 'clamp(3rem, 9.5vw, 8.5rem)' }}>
                    <span className="hero-line1 block overflow-hidden text-fg/90">Ahmad Faqih</span>
                    <span className="hero-line2 block overflow-hidden text-accent">Arrifa'i</span>
                </h1>

                {/* Sub */}
                <p className="hero-sub font-body text-dim leading-relaxed mb-10"
                    style={{ maxWidth: '42ch', fontSize: 'clamp(0.9rem, 1.3vw, 1.05rem)' }}>
                    I'm a 17-year-old fullstack developer from Jakarta. I build
                    React and Laravel apps, take 2nd place at national competitions,
                    and keep shipping when nobody's watching.
                </p>

                {/* CTAs — magnetic */}
                <div className="hero-ctas flex flex-wrap items-center gap-3 mb-14">
                    <Link ref={btnProjectsRef} to="/projects" className="btn btn-accent"
                        data-cursor-label="VIEW">
                        View Projects <ArrowDownRight size={13} />
                    </Link>
                  
                </div>

                {/* Stats */}
                {/* <div className="hero-stats border-t border-border pt-7 grid grid-cols-2 sm:grid-cols-4 gap-6">
                    {[
                        { n: '7', label: 'Projects shipped' },
                        { n: '#2', label: 'LKS National 2026' },
                        { n: '17', label: 'Years old' },
                        { n: '∞', label: 'Open source' },
                    ].map(s => (
                        <div key={s.label}>
                            <p className="font-display font-bold text-2xl md:text-3xl text-fg tracking-tight">{s.n}</p>
                            <p className="font-mono text-[9px] tracking-widest text-dim uppercase mt-1">{s.label}</p>
                        </div>
                    ))}
                </div> */}
            </div>

            {/* Scroll cue */}
            <motion.div
                className="absolute bottom-6 left-1/2 -translate-x-1/2"
                animate={{ opacity: [0.2, 0.7, 0.2] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            >
                <div className="w-px h-10 bg-gradient-to-b from-transparent via-muted/50 to-transparent mx-auto" />
            </motion.div>
        </section>
    )
}
