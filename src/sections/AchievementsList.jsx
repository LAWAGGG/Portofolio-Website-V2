import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Trophy } from 'lucide-react'
import { BackgroundPattern } from '../components/BackgroundPattern'
import { achievements } from '../data/achievements'
import { useMaskReveal } from '../hooks/useScrollReveal'

const tEase = [0.16, 1, 0.3, 1]

const rankColor = {
    1: '#f0b429',
    2: '#9ca3af',
    3: '#cd7f32',
}
const rankLabel = { 1: '1st Place', 2: '2nd Place', 3: '3rd Place' }

// Terbaru dulu, lalu peringkat tertinggi
const sorted = [...achievements].sort((a, b) => Number(b.year) - Number(a.year) || a.rank - b.rank)

export default function AchievementsList() {
    const ref = useRef(null)
    useMaskReveal(ref, '.reveal-heading')

    return (
        <section ref={ref} className="relative py-24 md:py-32 overflow-hidden">
            <BackgroundPattern variant="grid" opacity={0.08} />
            <div className="rule" />

            <div className="max-w-7xl mx-auto px-6 md:px-10 pt-14">
                <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
                    <div>
                        <p className="font-mono text-[11px] tracking-[0.22em] text-accent uppercase mb-3">
                            Achievements
                        </p>
                        <h2 className="reveal-heading font-display font-bold tracking-tighter text-fg"
                            style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>
                            Competition record.
                        </h2>
                    </div>
                    <span className="font-mono text-[10px] text-dim tracking-widest uppercase">
                        {sorted.length} results
                    </span>
                </div>

                <div className="max-w-3xl border border-border divide-y divide-border bg-surface">
                    {sorted.map((a, i) => (
                        <motion.div
                            key={a.id}
                            className="flex items-start gap-4 px-5 py-5 md:px-6"
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-40px' }}
                            transition={{ duration: 0.45, ease: tEase, delay: i * 0.06 }}
                        >
                            <span
                                className="font-mono text-[10px] tracking-widest px-2 py-1 border flex-shrink-0 mt-0.5"
                                style={{
                                    color: rankColor[a.rank],
                                    borderColor: `${rankColor[a.rank]}55`,
                                    background: `${rankColor[a.rank]}0d`,
                                }}
                            >
                                {rankLabel[a.rank].split(' ')[0]}
                            </span>
                            <div className="min-w-0 flex-1">
                                <h3 className="font-display font-semibold text-base text-fg tracking-tight">
                                    {a.title}
                                </h3>
                                <p className="font-mono text-[10px] tracking-wider text-dim uppercase">
                                    {a.level} · {a.year}
                                </p>
                                <p className="font-body text-sm text-dim leading-relaxed mt-1.5">
                                    {a.description}
                                </p>
                            </div>
                            <Trophy size={14} className="text-dim/40 flex-shrink-0 mt-1" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}