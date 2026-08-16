import { Github, Mail, Instagram } from 'lucide-react'

const socials = [
    { href: 'https://github.com/LAWAGGG', icon: <Github size={13} />, label: 'GitHub' },
    { href: 'mailto:fagih.arrifai@gmail.com', icon: <Mail size={13} />, label: 'Email' },
    { href: 'https://www.instagram.com/fagih_channel/', icon: <Instagram size={13} />, label: 'Instagram' },
]

export default function Footer() {
    return (
        <footer className="border-t border-border">
            <div className="max-w-7xl mx-auto px-6 md:px-10 py-10">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="flex items-center gap-3">
                        <span className="font-display font-bold text-accent">AF</span>
                        <span className="text-border">|</span>
                        <span className="font-mono text-[10px] text-dim tracking-wider">
                            Ahmad Faqih Arrifa'i © {new Date().getFullYear()}
                        </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        {socials.map(s => (
                            <a
                                key={s.label}
                                href={s.href}
                                target={s.label !== 'Email' ? '_blank' : undefined}
                                rel="noreferrer"
                                aria-label={s.label}
                                className="flex items-center gap-2 px-4 py-2 border border-border hover:border-accent/40 text-dim hover:text-fg transition-colors duration-200"
                            >
                                {s.icon}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}