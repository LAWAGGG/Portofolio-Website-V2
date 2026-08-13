import { useScroll, useTransform, motion } from 'framer-motion'
import { useRef } from 'react'

/*
 * ZoomParallax — sticky zoom-scroll showcase. Max 7 images.
 * Center image scales 4x, edge images up to 9x as user scrolls through h-[300vh].
 */
export function ZoomParallax({ images }) {
    const container = useRef(null)
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end'],
    })

    const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4])
    const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5])
    const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6])
    const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8])
    const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9])

    const scales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9]

    return (
        <div ref={container} className="relative h-[300vh]">
            <div className="sticky top-0 h-svh overflow-hidden">
                {images.map(({ src, alt }, index) => {
                    const scale = scales[index % scales.length]

                    return (
                        <motion.div
                            key={index}
                            style={{ scale }}
                            className={`absolute top-0 flex h-full w-full items-center justify-center ${index === 1 ? '[&>div]:!-top-[30vh] [&>div]:!left-[5vw] [&>div]:!h-[30vh] [&>div]:!w-[35vw]' : ''} ${index === 2 ? '[&>div]:!-top-[10vh] [&>div]:!-left-[25vw] [&>div]:!h-[45vh] [&>div]:!w-[20vw]' : ''} ${index === 3 ? '[&>div]:!left-[27.5vw] [&>div]:!h-[25vh] [&>div]:!w-[25vw]' : ''} ${index === 4 ? '[&>div]:!top-[27.5vh] [&>div]:!left-[5vw] [&>div]:!h-[25vh] [&>div]:!w-[20vw]' : ''} ${index === 5 ? '[&>div]:!top-[27.5vh] [&>div]:!-left-[22.5vw] [&>div]:!h-[25vh] [&>div]:!w-[30vw]' : ''} ${index === 6 ? '[&>div]:!top-[22.5vh] [&>div]:!left-[25vw] [&>div]:!h-[15vh] [&>div]:!w-[15vw]' : ''} `}
                        >
                            {index === 0 ? (
                                <div className="relative flex h-[25vh] w-[25vw] flex-col items-center justify-center gap-2 border border-border bg-surface/90 overflow-hidden">
                                    <span aria-hidden="true" className="absolute top-2 left-2 h-3 w-3 border-t border-l border-accent/60" />
                                    <span aria-hidden="true" className="absolute bottom-2 right-2 h-3 w-3 border-b border-r border-accent/60" />
                                    <div aria-hidden="true" className="pointer-events-none absolute -top-1/2 left-1/2 h-[140%] w-[140%] -translate-x-1/2 rounded-full bg-accent/10 blur-2xl" />
                                    <h3 className="relative font-display font-bold leading-none tracking-tighter text-fg text-center"
                                        style={{ fontSize: 'clamp(0.85rem, 3.2vw, 2.8rem)' }}>
                                        My Projects
                                    </h3>
                                </div>
                            ) : (
                                <div className="relative h-[25vh] w-[25vw]">
                                    <img
                                        src={src}
                                        alt={alt || `Project ${index + 1}`}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                            )}
                        </motion.div>
                    )
                })}
            </div>
        </div>
    )
}
