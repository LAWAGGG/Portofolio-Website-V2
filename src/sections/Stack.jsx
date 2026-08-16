import { useRef } from 'react'
import { motion } from 'framer-motion'
import { SiHtml5, SiCss, SiJavascript, SiReact, SiTailwindcss, SiPhp, SiLaravel, SiMysql, SiGit, SiFigma, SiGithub, SiPostman, SiPostgresql, SiFastapi, SiOpencode, SiUbuntu } from 'react-icons/si'
import { BackgroundPattern } from '../components/BackgroundPattern'
import { ContainerScroll } from '../components/ContainerScroll'
import { VscCode, VscCodeOss, VscVscode } from 'react-icons/vsc'

/*
 * TECH STACK — Blueprint architecture diagram, revealed inside a scroll card.
 * The card tilts back, then straightens + fills the screen as you scroll,
 * then the diagram fades as you leave. Runtime layers drawn top→bottom like
 * a real system diagram; Git lives in the Tools layer as version control.
 */

const tEase = [0.16, 1, 0.3, 1]

const layers = [
    {
        index: '01',
        name: 'Frontend',
        role: 'User interface',
        items: [
            { name: 'HTML', icon: SiHtml5, },
            { name: 'CSS', icon: SiCss, },
            { name: 'JavaScript', icon: SiJavascript, },
            { name: 'React', icon: SiReact, },
            { name: 'Tailwind', icon: SiTailwindcss, },
        ],
    },
    {
        index: '02',
        name: 'Backend',
        role: 'Server & APIs',
        items: [
            { name: 'PHP', icon: SiPhp, },
            { name: 'Laravel', icon: SiLaravel, },
            { name: 'FastAPI', icon: SiFastapi, },
        ],
    },
    {
        index: '03',
        name: 'Database',
        role: 'Storage',
        items: [
            { name: 'MySQL', icon: SiMysql, },
            { name: 'PostgreSQL', icon: SiPostgresql, },
        ],
    },
    {
        index: '04',
        name: 'Tools',
        role: 'Workflow',
        items: [
            { name: 'Git', icon: SiGit, },
            { name: 'Github', icon: SiGithub, },
            { name: 'Figma', icon: SiFigma, },
            { name: 'VS Code', icon: VscVscode, },
            { name: 'Postman', icon: SiPostman, },
            { name: 'Opencode', icon: SiOpencode, },
            { name: 'WSL', icon: SiUbuntu, },
        ],
    },
]

function Connector() {
    return (
        <div className="flex flex-col items-center py-1">
            <motion.div
                className="w-px h-6 bg-border origin-top"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, ease: tEase }}
            />
            <motion.span
                className="text-accent text-[9px] leading-none mt-0.5"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.3, ease: tEase, delay: 0.1 }}
            >
                ▼
            </motion.span>
        </div>
    )
}

function StackDiagram() {
    return (
        <div className="p-5 md:p-8 pb-16">
            <div className="relative max-w-3xl mx-auto">
                {layers.map((layer, li) => (
                    <div key={layer.name} className="relative">
                        {/* Layer panel */}
                        <motion.div
                            className="border border-border bg-surface/25 p-6 md:p-8"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-40px' }}
                            transition={{ duration: 0.55, ease: tEase, delay: li * 0.05 }}
                        >
                            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-5 pb-4 border-b border-border/70">
                                <div className="flex items-baseline gap-3">
                                    <span className="font-mono text-[10px] text-accent tracking-widest">{layer.index}</span>
                                    <h3 className="font-display font-bold text-lg text-fg tracking-tight uppercase">
                                        {layer.name}
                                    </h3>
                                </div>
                                <span className="font-mono text-[9px] tracking-widest text-dim uppercase">
                                    {layer.role}
                                </span>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                {layer.items.map(item => {
                                    const Icon = item.icon
                                    return (
                                        <motion.div
                                            key={item.name}
                                            className="group/item flex items-center gap-2.5 border border-border px-4 py-3 cursor-default hover:border-accent/50 hover:bg-accent/5 transition-colors duration-200"
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true, margin: '-40px' }}
                                            transition={{ duration: 0.4, ease: tEase, delay: li * 0.05 + 0.08 }}
                                        >
                                            <Icon size={15} className="text-dim group-hover/item:text-accent transition-colors" />
                                            <span className="font-display font-semibold text-sm text-fg">{item.name}</span>
                                            <span className="hidden md:inline font-mono text-[9px] text-dim uppercase">{item.note}</span>
                                        </motion.div>
                                    )
                                })}
                            </div>
                        </motion.div>

                        {/* Connector (except after last layer) */}
                        {li < layers.length - 1 && <Connector />}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default function Stack() {
    const sectionRef = useRef(null)

    return (
        <section ref={sectionRef} className="relative py-24 md:py-32">
            <BackgroundPattern variant="circuit" opacity={0.1} />
            <div className="rule" />

            <div className="max-w-7xl mx-auto px-6 md:px-10 pt-12 relative">
                <ContainerScroll
                    titleComponent={
                        <>
                            <p className="font-mono text-[11px] tracking-[0.22em] text-accent uppercase mb-6">
                                Tech Stack
                            </p>
                            <h2 className="font-display font-bold leading-tight tracking-tighter text-fg mx-auto"
                                style={{ fontSize: 'clamp(1.8rem, 4.5vw, 3.5rem)', maxWidth: '18ch' }}>
                                The stack behind every build.
                            </h2>
                        </>
                    }
                >
                    <StackDiagram />
                </ContainerScroll>
            </div>
        </section>
    )
}