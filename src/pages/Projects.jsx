import Projects from '../sections/Projects'
import { usePageMeta } from '../hooks/usePageMeta'

export default function ProjectsPage() {
    usePageMeta(
        'Projects — Ahmad Faqih Arrifa\'i',
        'All 7 projects by Ahmad Faqih Arrifa\'i — CommandSPES, SkillPath, FormKraft, TenAspiration, Schopedia, DanTen, SiJadwal.'
    )
    return <Projects />
}