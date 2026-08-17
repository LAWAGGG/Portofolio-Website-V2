import Achievements from '../sections/Achievements'
import { usePageMeta } from '../hooks/usePageMeta'

export default function AchievementPage() {
    usePageMeta(
        'Ahmad Faqih Ar Rifa\'i',
        'Competition record of Ahmad Faqih Arrifa\'i — LKS Web Technology (2nd National 2026, 1st Jakarta), Robotics (2nd 2024), MHQ Quran (2 top finishes 2018).'
    )
    return <Achievements />
}