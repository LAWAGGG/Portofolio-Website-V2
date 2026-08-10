import { Github, ArrowUpRight } from 'lucide-react'

/*
 * Reusable project card — intentionally minimal: image, title, and links
 * only. Full description lives in the Projects page's detail modal.
 * Pass `onClick` to make the card open a project detail view.
 */
export default function ProjectCard({ project, index, onClick }) {
    const inner = (
        <div className="project-img-wrap">
            <img src={project.image} alt={project.title} loading="lazy" />
        </div>
    )

    return (
        <div className="group relative">
            {onClick ? (
                <button
                    type="button"
                    onClick={() => onClick(project)}
                    aria-label={`View ${project.title}`}
                    className="block w-full text-left"
                >
                    {inner}
                </button>
            ) : (
                <div className="block w-full cursor-default">{inner}</div>
            )}

            <div className="pt-4 flex items-start justify-between gap-4">
                <div>
                    <p className="font-mono text-[10px] text-muted tracking-widest uppercase">
                        {String(index).padStart(2, '0')}
                    </p>
                    <h3 className="font-display font-semibold text-lg md:text-xl text-fg tracking-tight mt-1 group-hover:text-accent transition-colors duration-200">
                        {project.title}
                    </h3>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                    <a href={project.github} target="_blank" rel="noreferrer"
                        className="text-muted hover:text-fg transition-colors p-1.5" aria-label={`${project.title} on GitHub`}>
                        <Github size={15} />
                    </a>
                    {project.demo && (
                        <a href={project.demo} target="_blank" rel="noreferrer"
                            className="text-muted hover:text-fg transition-colors p-1.5" aria-label={`${project.title} live demo`}>
                            <ArrowUpRight size={15} />
                        </a>
                    )}
                </div>
            </div>
        </div>
    )
}