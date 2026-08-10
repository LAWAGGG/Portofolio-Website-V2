import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, MapPin, Phone, Github, Calendar } from 'lucide-react'
import { BackgroundPattern } from '../components/BackgroundPattern'
import { useMagneticButton } from '../hooks/useMagneticButton'
import { useMaskReveal } from '../hooks/useScrollReveal'

const tEase = [0.16, 1, 0.3, 1]

export default function About() {
    const sectionRef = useRef(null)
    const btnRef = useMagneticButton(0.35)
    const btnMailRef = useMagneticButton(0.3)
    useMaskReveal(sectionRef, '.reveal-heading')

    return (
        <section id="about" ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden">
            <BackgroundPattern variant="dots" opacity={0.05} />
            <div className="rule" />
            <div className="absolute -top-6 -left-4 section-index select-none">01</div>

            <div className="max-w-7xl mx-auto px-6 md:px-10 pt-14">
                <p className="font-mono text-[11px] tracking-[0.22em] text-accent uppercase mb-8">About</p>

                <h2 className="reveal-heading font-display font-bold leading-tight tracking-tighter text-fg mb-14"
                    style={{ fontSize: 'clamp(1.8rem, 4.5vw, 3.75rem)', maxWidth: '16ch' }}>
                    Fullstack dev. National runner-up in web.
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
                    {/* Photo */}
                    <motion.div
                        className="lg:col-span-3"
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.6, ease: tEase }}
                    >
                        <div className="relative w-48 md:w-full max-w-[200px] mx-auto lg:mx-0">
                            <div className="relative overflow-hidden border border-border" style={{ aspectRatio: '3/4' }}>
                                <img
                                    src="/images/gweh.jpg"
                                    alt="Ahmad Faqih Arrifa'i"
                                    className="w-full h-full object-cover object-top"
                                    style={{ filter: 'grayscale(15%) brightness(0.88)' }}
                                />
                                <div className="absolute inset-0" style={{
                                    background: 'linear-gradient(to top, rgba(13,17,23,0.45) 0%, transparent 55%)'
                                }} />
                            </div>
                            <div className="absolute -bottom-2 -right-2 w-6 h-6 border-r-2 border-b-2 border-accent" />
                            <div className="absolute -top-2 -left-2 w-6 h-6 border-l-2 border-t-2 border-border" />
                        </div>
                    </motion.div>

                    {/* Bio */}
                    <motion.div
                        className="lg:col-span-5 space-y-6"
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.6, ease: tEase, delay: 0.08 }}
                    >
                        <p className="font-body leading-relaxed"
                            style={{ fontSize: 'clamp(0.95rem, 1.25vw, 1.05rem)' }}>
                            I am a Web Developer with a great interest in technology and programming, especially full-stack web development. I have an understanding of front-end, back-end, and database management, which I developed through training experiences and learning at school. I am used to working in a team, communicating clearly, and making sure that every project I work on is completed according to the target.

                            Currently, I am still continuing to develop my skills in web development so that I can contribute better in the future.
                        </p>

                        <div className="pt-2 flex flex-wrap gap-3">
                            <Link ref={btnRef} to="/projects" className="btn btn-accent" data-cursor-label="VIEW">
                                See my work →
                            </Link>
                            <a ref={btnMailRef} href="mailto:fagih.arrifai@gmail.com"
                                className="btn btn-outline" data-cursor-label="CONTACT">
                                <Mail size={13} /> Contact me
                            </a>
                        </div>
                    </motion.div>

                    {/* Info card */}
                    <motion.div
                        className="lg:col-span-4"
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.6, ease: tEase, delay: 0.16 }}
                    >
                        <div className="border border-border bg-surface/25 p-5 space-y-4">
                            <p className="font-mono text-[9px] tracking-[0.2em] text-muted uppercase pb-3 border-b border-border">
                                — Profile
                            </p>
                            {[
                                { icon: <MapPin size={12} />, label: 'Based in', value: 'Jakarta, Indonesia' },
                                { icon: <Phone size={12} />, label: 'Phone', value: '(+62) 877-3136-6777', href: 'tel:+6287731366777' },
                                { icon: <Mail size={12} />, label: 'Email', value: 'fagih.arrifai@gmail.com', href: 'mailto:fagih.arrifai@gmail.com' },
                            ].map(item => (
                                <div key={item.label} className="flex items-start gap-3">
                                    <span className="text-accent mt-0.5 flex-shrink-0">{item.icon}</span>
                                    <div>
                                        <p className="font-mono text-[9px] tracking-widest text-muted uppercase mb-0.5">{item.label}</p>
                                        {item.href ? (
                                            <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
                                                className="font-body text-sm text-fg hover:text-accent transition-colors link-underline break-all">
                                                {item.value}
                                            </a>
                                        ) : (
                                            <p className="font-body text-sm text-fg">{item.value}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                            <div className="pt-3 border-t border-border flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#3fb950]" />
                                <span className="font-mono text-[9px] tracking-widest text-[#3fb950]/80 uppercase">Open to opportunities</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}