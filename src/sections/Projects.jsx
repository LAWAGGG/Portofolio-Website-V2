import { useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { AnimatePresence, motion } from 'framer-motion'
import { Github, ArrowUpRight, X } from 'lucide-react'
import { BackgroundPattern } from '../components/BackgroundPattern'
import ProjectCard from '../components/ProjectCard'
import { ZoomParallax } from '../components/ZoomParallax'
import { projects } from '../data/projects'
import { useMaskReveal } from '../hooks/useScrollReveal'
import { useModal } from '../hooks/useModal'

gsap.registerPlugin(ScrollTrigger)

const tEase = [0.16, 1, 0.3, 1]

export default function Projects() {
    const sectionRef = useRef(null)
    const [selected, setSelected] = useState(null)
    useMaskReveal(sectionRef, '.reveal-heading')
    useModal(Boolean(selected), () => setSelected(null))

    const scollImages = [
        {
            id: 7,
            title: 'SiJadwal',
            description: 'Teacher schedule information system with conflict detection and print export.',
            tech: ['Laravel', 'React', 'Tailwind'],
            github: 'https://github.com/LAWAGGG/sistem_informasi_jadwal',
            demo: 'https://sistem-informasi-jadwal.vercel.app/',
            image: '/images/projects/sistemjadwal.png',
            featured: false,
        },
        {
            id: 2,
            title: 'SkillPath',
            description: 'Education platform with Gemini AI integration for personalized learning paths.',
            tech: ['React', 'Tailwind', 'Laravel'],
            github: 'https://github.com/LAWAGGG/SkillPath',
            demo: null,
            image: '/images/projects/skillpath.png',
            featured: true,
        },

        {
            id: 4,
            title: 'TenAspiration',
            description: 'Student aspiration platform — submit and track school-wide ideas and feedback.',
            tech: ['Laravel', 'Tailwind', 'Alpine'],
            github: 'https://github.com/LAWAGGG/TenAspiration',
            demo: 'https://tenaspiration.site',
            image: '/images/projects/Aspiration.png',
            featured: true,
        },
        {
            id: 5,
            title: 'Schopedia',
            description: 'School marketplace connecting students, teachers, and vendors in one platform.',
            tech: ['Laravel', 'React', 'Tailwind'],
            github: 'https://github.com/LAWAGGG/Schopedia',
            demo: null,
            image: '/images/projects/schopedia.png',
            featured: true,
        },
        {
            id: 6,
            title: 'DanTen',
            description: 'OSIS Danusan marketplace for managing and selling school organization products.',
            tech: ['React', 'Tailwind'],
            github: 'https://github.com/LAWAGGG/DanTen',
            demo: 'https://dan-ten-osis.vercel.app/',
            image: '/images/projects/danten.png',
            featured: false,
        },


        {
            id: 1,
            title: 'CommandSPES',
            description: 'Class website portfolio with dynamic content management and responsive design.',
            tech: ['React', 'CSS'],
            github: 'https://github.com/LAWAGGG/CommandSPES-V2',
            demo: 'https://commandspes58.vercel.app/',
            image: '/images/projects/SPES.png',
            featured: false,
        },

        {
            id: 8,
            title: 'Plant Vs Zombie',
            description: 'Plant Vs Zombie minigame',
            tech: ['HTML', 'CSS', 'Javascript'],
            github: 'https://github.com/LAWAGGG/Plant-Vs-Zombie',
            demo: 'https://lawaggg.github.io/Plant-Vs-Zombie/',
            image: '/images/projects/pvz.png',
            featured: false,
        },
    ]

    return (
        <section id="projects" ref={sectionRef} className="relative py-24 md:py-32 overflow-clip">
            <BackgroundPattern variant="grid" opacity={0.08} />
            <div className="rule" />
            <div className="absolute -top-6 -right-4 section-index select-none text-right pointer-events-none">
                02
            </div>

            {/* Zoom parallax showcase — full-bleed sebelum grid */}
            <div className="relative my-24 md:my-32">
                <ZoomParallax images={scollImages.map(p => ({ src: p.image, alt: p.title }))} />
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-10 pt-14 relative">
                {/* Header */}
                <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
                    <div>
                        <p className="font-mono text-[11px] tracking-[0.22em] text-accent uppercase mb-3">
                            Projects
                        </p>
                        <h2
                            className="reveal-heading font-display font-bold tracking-tighter text-fg"
                            style={{ fontSize: 'clamp(1.8rem, 4vw, 3.25rem)' }}
                        >
                            Things I've built.
                        </h2>
                    </div>
                    <p className="font-mono text-[10px] text-dim tracking-widest uppercase">
                        {projects.length} projects
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-10 pt-14">
                {/* Uniform grid */}
                <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                    {projects.map((p, i) => (
                        <motion.div
                            key={p.id}
                            layout
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-40px' }}
                            transition={{ duration: 0.5, ease: tEase, delay: i * 0.05 }}
                        >
                            <ProjectCard project={p} index={i + 1} onClick={proj => setSelected(proj)} />
                        </motion.div>
                    ))}
                </motion.div>

                {/* Footer CTA */}
                <div className="mt-16 flex justify-end">
                    <a
                        href="https://github.com/LAWAGGG"
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-outline text-[10px]"
                        data-cursor-label="OPEN"
                    >
                        <Github size={12} /> All projects on GitHub
                    </a>
                </div>
            </div>

            {/* Project detail modal */}
            <AnimatePresence>
                {selected && (
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
                            className="relative w-full max-w-3xl bg-surface border border-border overflow-hidden"
                            initial={{ opacity: 0, y: 24, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 16, scale: 0.98 }}
                            transition={{ duration: 0.35, ease: tEase }}
                        >
                            <button
                                type="button"
                                onClick={() => setSelected(null)}
                                aria-label="Close"
                                autoFocus
                                className="absolute top-3 right-3 z-10 min-w-[44px] min-h-[44px] flex items-center justify-center bg-bg/70 border border-border text-dim hover:text-fg transition-colors"
                                data-cursor-label="CLOSE"
                            >
                                <X size={14} />
                            </button>

                            <img
                                src={selected.image}
                                alt={selected.title}
                                className="w-full object-cover object-top"
                                style={{ aspectRatio: '16/9', filter: 'grayscale(20%) brightness(0.85)' }}
                            />

                            <div className="p-6 sm:p-8">
                                <p className="font-mono text-[10px] tracking-widest text-dim uppercase mb-2">
                                    {selected.tech.join(' / ')}
                                </p>
                                <h3 className="font-display font-bold tracking-tighter text-fg mb-3"
                                    style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}>
                                    {selected.title}
                                </h3>
                                <p className="font-body text-sm text-dim leading-relaxed mb-6">
                                    {selected.description}
                                </p>
                                <div className="flex flex-wrap items-center gap-3">
                                    <a href={selected.github} target="_blank" rel="noreferrer"
                                        className="btn btn-outline text-[10px] py-2.5 px-5" data-cursor-label="CODE">
                                        GitHub <Github size={12} />
                                    </a>
                                    {selected.demo && (
                                        <a href={selected.demo} target="_blank" rel="noreferrer"
                                            className="btn btn-accent text-[10px] py-2.5 px-5" data-cursor-label="OPEN">
                                            Live demo <ArrowUpRight size={12} />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}