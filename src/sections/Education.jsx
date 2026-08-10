import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { education } from '../data/education'

gsap.registerPlugin(ScrollTrigger)

export default function Education() {
    const sectionRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const items = sectionRef.current.querySelectorAll('.edu-item')
            const line = sectionRef.current.querySelector('.edu-line')
            const dots = sectionRef.current.querySelectorAll('.edu-dot')

            // Draw the vertical line from scaleY 0 → 1, scrubbed
            if (line) {
                gsap.fromTo(line,
                    { scaleY: 0 },
                    {
                        scaleY: 1,
                        transformOrigin: 'top center',
                        ease: 'none',
                        scrollTrigger: {
                            trigger: '.edu-list',
                            start: 'top 75%',
                            end: 'bottom 60%',
                            scrub: 1,
                        },
                    }
                )
            }

            // Each item reveals exactly when the line "reaches" it
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
                // Dot pops in
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
                    Education
                </p>

                <div className="edu-list relative pl-10 max-w-2xl">
                    {/* Draw-in timeline line — starts at scaleY:0 */}
                    <div className="edu-line absolute left-0 top-2 bottom-2 w-px bg-border origin-top" />

                    {education.map((e, i) => (
                        <div key={i} className="edu-item relative mb-10 last:mb-0">
                            {/* Dot */}
                            <div className={`edu-dot absolute left-0 top-[0.4rem] w-2 h-2 rounded-full border -translate-x-[calc(50%+0.5px)] ${e.current
                                    ? 'bg-accent border-accent'
                                    : 'bg-bg border-muted'
                                }`} />

                            <div className="grid grid-cols-1 sm:grid-cols-4 gap-1 sm:gap-6 items-baseline">
                                <p className="font-mono text-[10px] text-muted tracking-wider sm:text-right pt-0.5">
                                    {e.period}
                                </p>
                                <div className="sm:col-span-3">
                                    <h3 className="font-display font-semibold text-base md:text-lg text-fg tracking-tight flex flex-wrap items-center gap-2">
                                        {e.school}
                                        {e.current && (
                                            <span className="font-mono text-[9px] text-accent border border-accent/30 px-2 py-0.5 leading-none">
                                                NOW
                                            </span>
                                        )}
                                    </h3>
                                    <p className="font-body text-sm text-dim mt-0.5">
                                        {e.level}{e.major ? ` — ${e.major}` : ''}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
