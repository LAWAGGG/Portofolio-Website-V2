import { useEffect } from 'react'

const SITE = 'Ahmad Faqih Arrifa\'i'

/** Sets per-page <title> and meta description. */
export function usePageMeta(title, description) {
    useEffect(() => {
        const fullTitle = title.includes(SITE) ? title : `${title} — ${SITE}`
        document.title = fullTitle
        let meta = document.querySelector('meta[name="description"]')
        if (!meta) {
            meta = document.createElement('meta')
            meta.setAttribute('name', 'description')
            document.head.appendChild(meta)
        }
        meta.setAttribute('content', description || '')
    }, [title, description])
}