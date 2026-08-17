import Projects from '../sections/Projects'
import { usePageMeta } from '../hooks/usePageMeta'

export default function ProjectsPage() {
    usePageMeta(
        'Ahmad Faqih Ar Rifa\'i',
        'All projects by Ahmad Faqih Ar Rifa\'i'
    )
    return <Projects />
}