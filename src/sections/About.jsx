import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, MapPin, Phone } from 'lucide-react'
import { BackgroundPattern } from '../components/BackgroundPattern'
import { useMaskReveal } from '../hooks/useScrollReveal'

const tEase = [0.16, 1, 0.3, 1]

export default function About() {
    const sectionRef = useRef(null)
    useMaskReveal(sectionRef, '.reveal-heading')

    return (
        <section id="about" ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden">
            <BackgroundPattern variant="dots" opacity={0.08} />
            <div className="rule" />
            <div className="max-w-7xl mx-auto px-6 md:px-10 pt-14">
                <p className="font-mono text-[11px] tracking-[0.22em] text-accent uppercase mb-8">About</p>

                <h2 className="reveal-heading font-display font-bold leading-tight tracking-tighter text-fg mb-4"
                    style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
                    Ahmad Faqih Ar Rifa'i
                </h2>
                <div className="flex flex-wrap gap-2 mb-14">
                    {['Fullstack Web Developer', 'Backend Developer'].map(r => (
                        <span key={r} className="tech-chip">{r}</span>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
                    {/* Photo */}
                    <motion.div
                        className="lg:col-span-4"
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.6, ease: tEase }}
                    >
                        <div className="relative overflow-hidden border border-border max-w-[260px] mx-auto lg:mx-0" style={{ aspectRatio: '3/4' }}>
                            <img
                                src="/images/gweh.jpg"
                                alt="Ahmad Faqih Arrifa'i"
                                className="w-full h-full object-cover object-top"
                                style={{ filter: 'grayscale(20%) brightness(0.92)' }}
                            />
                        </div>
                    </motion.div>

                    {/* Bio */}
                    <motion.div
                        className="lg:col-span-8 space-y-6"
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.6, ease: tEase, delay: 0.08 }}
                    >
                        <p className="font-body leading-relaxed"
                            style={{ fontSize: 'clamp(0.95rem, 1.25vw, 1.05rem)', maxWidth: '52ch' }}>
                            A Web Developer with a great interest in technology and programming,
                            especially full-stack web development. I have an understanding of
                            front-end, back-end, and database management, which I developed
                            through training experiences and learning at school.
                        </p>
                        <p className="font-body text-dim leading-relaxed"
                            style={{ fontSize: 'clamp(0.95rem, 1.25vw, 1.05rem)', maxWidth: '52ch' }}>
                            I am used to working in a team, communicating clearly, and making sure
                            that every project I work on is completed according to the target.
                            Currently, I am still continuing to develop my skills in web development
                            so that I can contribute better in the future.
                        </p>

                        <div className="pt-2 flex flex-wrap gap-3">
                            <Link to="/projects" className="btn btn-accent">
                                See my work →
                            </Link>
                            <a href="mailto:fagih.arrifai@gmail.com" className="btn btn-outline">
                                <Mail size={13} /> Contact me
                            </a>
                        </div>
                    </motion.div>
                </div>

                {/* Contact strip */}
                <motion.div
                    className="mt-16 border border-border bg-surface"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.6, ease: tEase, delay: 0.12 }}
                >
                    <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border">
                        {[
                            { icon: <MapPin size={13} />, label: 'Based in', value: 'Jakarta, Indonesia' },
                            { icon: <Mail size={13} />, label: 'Email', value: 'fagih.arrifai@gmail.com', href: 'mailto:fagih.arrifai@gmail.com' },
                            { icon: <Phone size={13} />, label: 'Phone', value: '(+62) 877-3136-6777', href: 'tel:+6287731366777' },
                        ].map(item => (
                            <div key={item.label} className="p-6 flex items-start gap-3">
                                <span className="text-accent mt-0.5 flex-shrink-0">{item.icon}</span>
                                <div>
                                    <p className="font-mono text-[9px] tracking-widest text-dim uppercase mb-1">{item.label}</p>
                                    {item.href ? (
                                        <a href={item.href}
                                            className="font-body text-sm text-fg hover:text-accent transition-colors break-all">
                                            {item.value}
                                        </a>
                                    ) : (
                                        <p className="font-body text-sm text-fg">{item.value}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="border-t border-border px-6 py-3.5 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#3fb950]" />
                        <span className="font-mono text-[9px] tracking-widest text-[#3fb950]/80 uppercase">
                            Open to opportunities — internship & freelance
                        </span>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}