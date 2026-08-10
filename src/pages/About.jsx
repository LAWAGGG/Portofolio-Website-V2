import About from '../sections/About'
import StatsStrip from '../sections/StatsStrip'
import TechStack from '../sections/TechStack'
import Education from '../sections/Education'
import Experience from '../sections/Experience'
import AchievementsList from '../sections/AchievementsList'
import { usePageMeta } from '../hooks/usePageMeta'

export default function AboutPage() {
    usePageMeta(
        'About — Ahmad Faqih Arrifa\'i',
        'About Ahmad Faqih Arrifa\'i — 17-year-old fullstack developer from Jakarta, Indonesia. Fullstack (React, Laravel), PT TenizenCode, LKS 2026 silver medalist.'
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