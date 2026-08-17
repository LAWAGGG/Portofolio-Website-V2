import About from '../sections/About'
import StatsStrip from '../sections/StatsStrip'
import TechStack from '../sections/TechStack'
import Education from '../sections/Education'
import Experience from '../sections/Experience'
import { usePageMeta } from '../hooks/usePageMeta'

export default function AboutPage() {
    usePageMeta(
        'Ahmad Faqih Ar Rifa\'i',
        'About Ahmad Faqih Arrifa\'i — fullstack web developer from Jakarta, Indonesia, interested in front-end, back-end, and database management.'
    )
    return (
        <>
            <About />
            <StatsStrip />
            <TechStack />
            <Education />
            <Experience />
        </>
    )
}