import { useRef } from 'react'
import { motion } from 'framer-motion'
import { SiHtml5, SiCss, SiJavascript, SiReact, SiLaravel, SiFastapi, SiMysql, SiPostgresql, SiGit, SiGithub, SiPostman, SiOpencode, SiPhp, SiUbuntu } from 'react-icons/si'
import { BackgroundPattern } from '../components/BackgroundPattern'
import { useMaskReveal } from '../hooks/useScrollReveal'
import { VscVscode } from 'react-icons/vsc'

const tEase = [0.16, 1, 0.3, 1]

const groups = [
    {
        name: 'Programming Languages',
        items: [
            { name: 'HTML5', icon: SiHtml5 },
            { name: 'CSS3', icon: SiCss },
            { name: 'JavaScript', icon: SiJavascript },
            { name: 'PHP', icon: SiPhp },
        ],
    },
    {
        name: 'Frameworks / Libraries',
        items: [
            { name: 'React.js', icon: SiReact },
            { name: 'Laravel', icon: SiLaravel },
            { name: 'FastAPI', icon: SiFastapi },
        ],
    },
    {
        name: 'Database Management',
        items: [
            { name: 'MySQL', icon: SiMysql },
            { name: 'PostgreSQL', icon: SiPostgresql },
        ],
    },
    {
        name: 'Tools',
        items: [
            { name: 'Git', icon: SiGit },
            { name: 'GitHub', icon: SiGithub },
            { name: 'VS Code', icon: VscVscode, },
            { name: 'Postman', icon: SiPostman, },
            { name: 'Opencode', icon: SiOpencode, },
            { name: 'WSL', icon: SiUbuntu, },
        ],
    },
]

const softSkills = [
    'Team Collaboration',
    'Clear Communication',
    'Problem Solving',
    'Time Management & Deadline Discipline',
]

export default function TechStack() {
    const ref = useRef(null)
    useMaskReveal(ref, '.reveal-heading')

    return (
        <section ref={ref} className="relative py-20 md:py-28 overflow-hidden">
            <BackgroundPattern variant="gridSm" opacity={0.08} />
            <div className="rule" />

            <div className="max-w-7xl mx-auto px-6 md:px-10 pt-12">
                <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
                    <div>
                        <p className="font-mono text-[11px] tracking-[0.22em] text-accent uppercase mb-3">
                            Tech Stack
                        </p>
                        <h2 className="reveal-heading font-display font-bold tracking-tighter text-fg"
                            style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>
                            Tools I work with.
                        </h2>
                    </div>
                    <span className="font-mono text-[10px] text-dim tracking-widest uppercase">
                        {groups.flatMap(g=>g.items).length} technologies
                    </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                    {groups.map((group, gi) => (
                        <motion.div
                            key={group.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-40px' }}
                            transition={{ duration: 0.5, ease: tEase, delay: gi * 0.07 }}
                        >
                            <p className="font-mono text-[9px] tracking-[0.2em] text-dim uppercase pb-3 border-b border-border mb-4">
                                {group.name}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {group.items.map(item => {
                                    const Icon = item.icon
                                    return (
                                        <div
                                            key={item.name}
                                            className="flex items-center gap-2 border border-border px-3 py-2 hover:border-accent/50 hover:bg-accent/5 transition-colors duration-200"
                                        >
                                            <Icon size={15} className="text-dim" />
                                            <span className="font-display font-medium text-sm text-fg">{item.name}</span>
                                        </div>
                                    )
                                })}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Soft skills */}
                <div className="mt-16 pt-8 border-t border-border">
                    <p className="font-mono text-[9px] tracking-[0.2em] text-dim uppercase mb-4">
                        Soft skills
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {softSkills.map((s, i) => (
                            <motion.span
                                key={s}
                                className="tech-chip"
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, margin: '-40px' }}
                                transition={{ duration: 0.4, ease: tEase, delay: i * 0.05 }}
                            >
                                {s}
                            </motion.span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}