import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { experience } from '../data/experience'

gsap.registerPlugin(ScrollTrigger)

/*
 * EXPERIENCE — timeline pekerjaan & organisasi.
 * Gaya visual selaras dengan Education: garis ditarik scrub, item muncul
 * saat garis "sampai" ke item, dot pop.
 */

export default function Experience() {
    const sectionRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const items = sectionRef.current.querySelectorAll('.exp-item')
            const line = sectionRef.current.querySelector('.exp-line')
            const dots = sectionRef.current.querySelectorAll('.exp-dot')

            if (line) {
                gsap.fromTo(line,
                    { scaleY: 0 },
                    {
                        scaleY: 1,
                        transformOrigin: 'top center',
                        ease: 'none',
                        scrollTrigger: {
                            trigger: '.exp-list',
                            start: 'top 75%',
                            end: 'bottom 60%',
                            scrub: 1,
                        },
                    }
                )
            }

            items.forEach((item, i) => {
                gsap.from(item, {
                    scrollTrigger: {
                        trigger: item,
                        start: 'top 82%',
                        once: true,
                        immediateRender: false,
                    },
                    x: -24, opacity: 0, duration: 0.55, ease: 'power2.out',
                })
                if (dots[i]) {
                    gsap.from(dots[i], {
                        scrollTrigger: { trigger: item, start: 'top 82%', once: true, immediateRender: false },
                        scale: 0, duration: 0.4, delay: 0.1, ease: 'back.out(2)',
                    })
                }
            })
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="relative py-20 md:py-24 overflow-hidden">
            <div className="rule" />

            <div className="max-w-7xl mx-auto px-6 md:px-10 pt-12">
                <p className="font-mono text-[11px] tracking-[0.22em] text-accent uppercase mb-10">
                    Experience
                </p>

                <div className="exp-list relative pl-10 max-w-2xl">
                    {/* Draw-in timeline line */}
                    <div className="exp-line absolute left-0 top-2 bottom-2 w-px bg-border origin-top" />

                    {experience.map((e, i) => (
                        <div key={i} className="exp-item relative mb-10 last:mb-0">
                            {/* Dot */}
                            <div className={`exp-dot absolute left-0 top-[0.4rem] w-2 h-2 rounded-full border -translate-x-[calc(50%+0.5px)] ${e.current
                                    ? 'bg-accent border-accent'
                                    : 'bg-bg border-muted'
                                }`} />

                            <div className="grid grid-cols-1 sm:grid-cols-4 gap-1 sm:gap-6 items-baseline">
                                <p className="font-mono text-[10px] text-muted tracking-wider sm:text-right pt-0.5">
                                    {e.period}
                                </p>
                                <div className="sm:col-span-3">
                                    <h3 className="font-display font-semibold text-base md:text-lg text-fg tracking-tight">
                                        {e.company}
                                    </h3>
                                    <p className="font-body text-sm text-dim mt-0.5">
                                        {e.role}
                                    </p>
                                    <ul className="mt-3 space-y-2">
                                        {e.points.map((p, pi) => (
                                            <li key={pi} className="font-body text-sm text-muted leading-relaxed flex gap-2">
                                                <span className="text-accent flex-shrink-0 mt-0.5">—</span>
                                                {p}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}