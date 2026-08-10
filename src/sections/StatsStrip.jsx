import { useRef } from 'react'
import { useFadeUp } from '../hooks/useScrollReveal'

/*
 * STATS STRIP — ringkasan angka pencapaian. Full-width strip setelah hero:
 * 4 kompetisi, silver medal LKS nasional, 1 proyek profesional, mulai 2025.
 */

const stats = [
    { n: '4', label: 'Competitions entered',  },
    { n: '30+', label: 'Total projects',  },
    { n: '2', label: 'Years of experience',  },
]

export default function StatsStrip() {
    const ref = useRef(null)
    useFadeUp(ref, '.fade-up', 0.08)

    return (
        <section ref={ref} className="relative py-10 md:py-14 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-border divide-y sm:divide-y-0 sm:divide-x divide-border">
                    {stats.map(s => (
                        <div key={s.label} className="fade-up p-6 md:p-8">
                            <p className="font-display font-bold leading-none text-fg tracking-tight"
                                style={{ fontSize: 'clamp(2.5rem, 5vw, 3.75rem)' }}>
                                {s.n}
                            </p>
                            <p className="font-mono text-[9px] tracking-[0.18em] text-accent uppercase mt-3">
                                {s.label}
                            </p>
                            <p className="font-body text-[13px] text-dim mt-1.5 leading-relaxed">
                                {s.note}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}