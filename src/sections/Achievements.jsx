import { useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, X } from 'lucide-react'
import { BackgroundPattern } from '../components/BackgroundPattern'
import { achievements } from '../data/achievements'
import { useMaskReveal } from '../hooks/useScrollReveal'
import { useModal } from '../hooks/useModal'

gsap.registerPlugin(ScrollTrigger)

/*
 * ACHIEVEMENTS — Grouped by year, newest first. Each row opens a detail
 * modal (certificate placeholder, rank, level, year) that animates from the
 * clicked card. Bottom-sheet on mobile, centered dialog on desktop.
 */

const rankColor = {
    1: '#f0b429',
    2: '#9ca3af',
    3: '#cd7f32',
}
const rankLabel = { 1: '1st Place', 2: '2nd Place', 3: '3rd Place' }
const tEase = [0.16, 1, 0.3, 1]

const years = [...new Set(achievements.map(a => a.year))].sort((a, b) => Number(b) - Number(a))

export default function Achievements() {
    const sectionRef = useRef(null)
    const [selected, setSelected] = useState(null)
    const [origin, setOrigin] = useState(null)
    useMaskReveal(sectionRef, '.reveal-heading')
    useModal(Boolean(selected), () => setSelected(null))

    const open = (a, e) => {
        const r = e.currentTarget.getBoundingClientRect()
        setOrigin({
            x: r.left + r.width / 2 - window.innerWidth / 2,
            y: r.top + r.height / 2 - window.innerHeight / 2,
            scale: Math.max(0.35, Math.min(r.width / 560, 0.5)),
        })
        setSelected(a)
    }

    return (
        <section id="achievements" ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden">
            <BackgroundPattern variant="grid" opacity={0.05} />
            <div className="rule" />
            <div className="absolute -top-6 -left-4 section-index select-none">03</div>

            <div className="max-w-7xl mx-auto px-6 md:px-10 pt-14 relative">
                <p className="font-mono text-[11px] tracking-[0.22em] text-accent uppercase mb-3">
                    Achievements
                </p>
                <h2 className="reveal-heading font-display font-bold tracking-tighter text-fg mb-14"
                    style={{ fontSize: 'clamp(1.8rem, 4vw, 3.25rem)' }}>
                    Competition record.
                </h2>

                <div className="relative pl-10 sm:pl-14 max-w-3xl">
                    {/* Dashed connector line */}
                    <div className="absolute left-0 top-2 bottom-6 w-px border-l border-dashed border-border" />

                    {years.map((year, yi) => {
                        const list = achievements.filter(a => a.year === year)
                        return (
                            <motion.div
                                key={year}
                                className="relative pb-12 last:pb-0"
                                initial={{ opacity: 0, x: -16 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: '-60px' }}
                                transition={{ duration: 0.55, ease: tEase }}
                            >
                                {/* Square marker */}
                                <span className={`absolute -left-10 sm:-left-14 top-1 w-2.5 h-2.5 -translate-x-1/2 rotate-45 ${yi === 0 ? 'bg-accent' : 'bg-bg border border-muted'}`} />

                                {/* Year header */}
                                <div className="flex items-baseline gap-3 mb-4">
                                    <span
                                        className="font-display font-bold leading-none tracking-tighter"
                                        style={{
                                            fontSize: yi === 0 ? 'clamp(2.25rem, 5vw, 3.5rem)' : 'clamp(1.5rem, 3vw, 2.25rem)',
                                            color: yi === 0 ? '#e6edf3' : '#8b949e',
                                        }}
                                    >
                                        {year}
                                    </span>
                                    <span className="font-mono text-[10px] text-muted tracking-widest uppercase">
                                        {list.length} result{list.length > 1 ? 's' : ''}
                                    </span>
                                </div>

                                {/* Result rows — clickable */}
                                <div className="border border-border divide-y divide-border bg-surface/10">
                                    {list.map((a, i) => (
                                        <motion.button
                                            key={a.id}
                                            type="button"
                                            onClick={e => open(a, e)}
                                            aria-haspopup="dialog"
                                            data-cursor-label="VIEW"
                                            className="group w-full flex items-center gap-4 px-5 py-4 text-left transition-colors duration-200 hover:bg-surface/40"
                                            initial={{ opacity: 0, y: 12 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true, margin: '-40px' }}
                                            transition={{ duration: 0.4, ease: tEase, delay: i * 0.06 }}
                                        >
                                            <span
                                                className="font-mono text-[10px] tracking-widest px-2 py-1 border flex-shrink-0"
                                                style={{
                                                    color: rankColor[a.rank],
                                                    borderColor: `${rankColor[a.rank]}55`,
                                                    background: `${rankColor[a.rank]}0d`,
                                                }}
                                            >
                                                {rankLabel[a.rank].split(' ')[0]}
                                            </span>
                                            <div className="min-w-0 flex-1">
                                                <h3 className="font-display font-semibold text-base text-fg tracking-tight group-hover:text-accent transition-colors">
                                                    {a.title}
                                                </h3>
                                                <p className="font-mono text-[10px] tracking-wider text-dim uppercase">
                                                    {a.level}
                                                </p>
                                            </div>
                                            <ArrowUpRight
                                                size={14}
                                                className="text-muted/60 group-hover:text-accent transition-colors flex-shrink-0"
                                            />
                                        </motion.button>
                                    ))}
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>

            {/* Achievement detail modal */}
            <AnimatePresence>
                {selected && origin && (
                    <motion.div
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                    >
                        <div
                            className="absolute inset-0 bg-bg/85 backdrop-blur-sm"
                            onClick={() => setSelected(null)}
                        />
                        <motion.div
                            role="dialog"
                            aria-modal="true"
                            aria-label={selected.title}
                            className="relative w-full max-w-xl bg-surface border border-border overflow-hidden rounded-xl"
                            initial={{
                                x: origin.x,
                                y: origin.y,
                                scale: origin.scale,
                                opacity: 0.3,
                            }}
                            animate={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                            exit={{ opacity: 0, y: 24, scale: 0.97 }}
                            transition={{ duration: 0.4, ease: tEase }}
                        >
                            <button
                                type="button"
                                onClick={() => setSelected(null)}
                                aria-label="Close"
                                autoFocus
                                className="absolute top-3 right-3 z-10 min-w-[44px] min-h-[44px] flex items-center justify-center bg-bg/70 border border-border text-muted hover:text-fg transition-colors"
                                data-cursor-label="CLOSE"
                            >
                                <X size={14} />
                            </button>

                            <div className="max-h-[92dvh] sm:max-h-[85vh] overflow-y-auto">
                                <img
                                    src={selected.certificate}
                                    alt={`Certificate — ${selected.title} (${selected.level})`}
                                    className="w-full object-cover"
                                    style={{ aspectRatio: '4/3', filter: 'grayscale(15%) brightness(0.9)' }}
                                />

                                <div className="p-6 sm:p-8">
                                    <span
                                        className="inline-flex font-display font-bold tracking-tighter mb-4"
                                        style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: rankColor[selected.rank], letterSpacing: '-0.03em' }}
                                    >
                                        {rankLabel[selected.rank]}
                                    </span>
                                    <h3 className="font-display font-bold tracking-tighter text-fg mb-2"
                                        style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}>
                                        {selected.title}
                                    </h3>
                                    <p className="font-mono text-[11px] tracking-wider text-accent uppercase mb-4">
                                        {selected.level} · {selected.year}
                                    </p>
                                    <p className="font-body text-sm text-dim leading-relaxed">
                                        {selected.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}