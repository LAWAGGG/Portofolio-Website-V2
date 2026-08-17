import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Mail } from 'lucide-react'
import Hero from '../sections/Hero'
import Stack from '../sections/Stack'
import ProjectCard from '../components/ProjectCard'
import { BackgroundPattern } from '../components/BackgroundPattern'
import { projects } from '../data/projects'
import { achievements } from '../data/achievements'
import { useFadeUp } from '../hooks/useScrollReveal'
import { usePageMeta } from '../hooks/usePageMeta'

const featured = projects.filter(p => p.featured)

/* Preview shows only the newest year of achievements (2026). */
const latestYear = String(Math.max(...achievements.map(a => Number(a.year))))
const topStats = achievements.filter(a => a.year === latestYear)
   .map(a => ({ rank: a.rank, title: a.title, level: `${a.level} · ${a.year}` }))
function AboutPreview() {
    const ref = useRef(null)
    useFadeUp(ref, '.fade-up', 0.12)
    return (
        <section ref={ref} className="relative py-16 md:py-24 overflow-hidden">
            <BackgroundPattern variant="dots" opacity={0.12} />
            <div className="rule" />
            <div className="max-w-7xl mx-auto px-6 md:px-10 pt-12">
                <p className="fade-up font-mono text-[11px] tracking-[0.22em] text-accent uppercase mb-8">Who I am</p>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                    <h2 className="fade-up font-display font-bold leading-tight tracking-tighter text-fg lg:col-span-7"
                        style={{ fontSize: 'clamp(1.8rem, 4.5vw, 3.5rem)' }}>
                        Fullstack developer & software engineering student from Jakarta.
                    </h2>
                    <div className="lg:col-span-5 space-y-6">
                        <p className="fade-up font-body text-dim leading-relaxed" style={{ maxWidth: '46ch' }}>
                            Web developer with a deep interest in technology and programming,
                            focused on full-stack development. Front-end, back-end, and database
                            fundamentals built through school training and real projects. I work
                            well in teams, communicate clearly, and make sure every project lands
                            on target.
                        </p>
                        <div className="fade-up flex flex-wrap gap-3">
<Link to="/about" className="btn btn-accent" data-cursor-label="READ">
                                    See more <ArrowRight size={13} />
                                </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

/* Featured projects teaser — 3 cards + link to full page */
function FeaturedPreview() {
    const ref = useRef(null)
    useFadeUp(ref, '.fade-up', 0.1)
    return (
        <section ref={ref} className="relative py-16 md:py-24 overflow-hidden">
            <BackgroundPattern variant="gridSm" opacity={0.08} />
            <div className="rule" />
            <div className="max-w-7xl mx-auto px-6 md:px-10 pt-12">
                <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
                    <div>
                        <p className="fade-up font-mono text-[11px] tracking-[0.22em] text-accent uppercase mb-4">Selected Work</p>
                        <h2 className="fade-up font-display font-bold tracking-tighter text-fg"
                            style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>
                            Featured projects.
                        </h2>
                    </div>
                    <span className="fade-up font-mono text-[10px] text-dim tracking-widest uppercase">
                        {String(featured.length).padStart(2, '0')} / 07 featured
                    </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featured.map((p, i) => (
                        <div className="fade-up" key={p.id}>
                            <ProjectCard project={p} index={i + 1} />
                        </div>
                    ))}
                </div>

                <div className="fade-up mt-12 flex justify-end">
<Link to="/projects" className="btn btn-outline" data-cursor-label="ALL">
                                    See all projects <ArrowRight size={13} />
                                </Link>
                </div>
            </div>
        </section>
    )
}

/* Achievement highlight — 3 top results */
function AchievementPreview() {
    const ref = useRef(null)
    useFadeUp(ref, '.fade-up', 0.1)
    return (
        <section ref={ref} className="relative py-16 md:py-24 overflow-hidden">
            <BackgroundPattern variant="dots" opacity={0.12} />
            <div className="rule" />
            <div className="max-w-7xl mx-auto px-6 md:px-10 pt-12">
                <p className="fade-up font-mono text-[11px] tracking-[0.22em] text-accent uppercase mb-4">Competition Record</p>
                <h2 className="fade-up font-display font-bold tracking-tighter text-fg mb-12"
                    style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>
                    Top achievements.
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 border border-border divide-y sm:divide-y-0 sm:divide-x divide-border">
                    {topStats.map((a, i) => (
                        <div key={i} className="fade-up p-7 flex flex-col justify-between gap-6 bg-surface hover:bg-fg/[0.04] transition-colors duration-200">
                            <span className="font-display font-bold leading-none text-fg"
                                style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', letterSpacing: '-0.04em' }}>
                                <span className="text-accent">#{a.rank}</span>
                            </span>
                            <div>
                                <h3 className="font-display font-semibold text-base text-fg tracking-tight mb-1">{a.title}</h3>
                                <p className="font-mono text-[11px] tracking-wider text-dim uppercase">{a.level}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="fade-up mt-10 flex justify-end">
<Link to="/achievement" className="btn btn-outline" data-cursor-label="ALL">
                                    See all achievements <ArrowRight size={13} />
                                </Link>
                </div>
            </div>
        </section>
    )
}

/* Closing CTA — concise contact push */
function ClosingCTA() {
    const ref = useRef(null)
    useFadeUp(ref, '.fade-up', 0.12)
    return (
        <section ref={ref} className="relative py-24 md:py-32 overflow-hidden">
            <div className="rule" />
            <div className="max-w-7xl mx-auto px-6 md:px-10 pt-14 text-center">
                <p className="fade-up font-mono text-[11px] tracking-[0.22em] text-accent uppercase mb-6">Let's Talk</p>
                <h2 className="fade-up font-display font-bold tracking-tighter text-fg mb-8 mx-auto"
                    style={{ fontSize: 'clamp(2rem, 5.5vw, 4.5rem)', maxWidth: '16ch', lineHeight: 1.05 }}>
                    Have a project in mind?
                </h2>
                <p className="fade-up font-body text-dim leading-relaxed mb-10 mx-auto" style={{ maxWidth: '40ch' }}>
                    Available for freelance, internships, and collaborations. I respond within 24 hours.
                </p>
                <div className="fade-up flex flex-wrap justify-center gap-3">
                    <a href="mailto:fagih.arrifai@gmail.com" className="btn btn-accent" data-cursor-label="OPEN">
                        Get in touch <Mail size={13} />
                    </a>
                </div>
            </div>
        </section>
    )
}

export default function Home() {
    usePageMeta(
        'Ahmad Faqih Ar Rifa\'i',
        'Portfolio of Ahmad Faqih Arrifa\'i — 17-year-old fullstack web developer from Indonesia. LKS Web Technology National 2nd place 2026.'
    )
    return (
        <>
            <Hero />
            <AboutPreview />
            <Stack />
            <FeaturedPreview />
            <AchievementPreview />
            <ClosingCTA />
        </>
    )
}