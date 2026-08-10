import React from 'react'
import { useScroll, useTransform, motion, useReducedMotion } from 'framer-motion'

/*
 * ContainerScroll — card "perangkat" yang ke-pin di tengah layar (sticky).
 * Title ada di belakang (absolute, z-0). Card mulai miring + posisi agak
 * bawah, lalu naik ke tengah vertikal (translateY 16vh → 0) sambil nutup
 * title. Saat user scroll page, ISI card naik sendiri (translateY pixel,
 * diukur dari tinggi konten minus jendela). Lock/sticky + scrollytelling
 * tetap seperti sebelumnya.
 */

export const ContainerScroll = ({ titleComponent, children }) => {
    const containerRef = React.useRef(null)
    const contentRef = React.useRef(null)
    const [travel, setTravel] = React.useState(0)
    const reduceMotion = useReducedMotion()

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    })

    // Ukur tinggi konten asli vs jendela card → jarak transit maksimal
    React.useLayoutEffect(() => {
        const content = contentRef.current
        if (!content) return

        const compute = () => {
            const windowH = content.parentElement.clientHeight
            const contentH = content.scrollHeight
            setTravel(Math.max(0, contentH - windowH))
        }
        compute()
        const ro = new ResizeObserver(compute)
        ro.observe(content)
        return () => ro.disconnect()
    }, [])

    // Miring sepanjang perjalanan naik — sinkron sama cardY biar kelihatan
    const rotate = useTransform(scrollYProgress, [0, 0.6], [18, 0])
    const scale = useTransform(scrollYProgress, [0, 0.35], [0.92, 1])
    const contentY = useTransform(scrollYProgress, [0.12, 1], [0, -travel])
    // Card naik dari bawah (di bawah fold) ke tengah — title kebaca dulu, barulah ketutup
    const cardY = useTransform(scrollYProgress, [0, 0.6], ['32vh', '0vh'])

    const style = reduceMotion ? {} : { rotateX: rotate, scale }

    return (
        <div ref={containerRef} className="relative h-[300vh]">
            <div className="sticky top-0 h-svh w-full flex items-center justify-center overflow-hidden px-4 md:px-16">
                <div className="w-full max-w-5xl relative" style={{ perspective: '1200px' }}>
                    {/* Title — belakang, ke-pin di area atas biar kebaca dulu */}
                    <div className="absolute inset-x-0 top-[6%] z-0 pointer-events-none">
                        <Header titleComponent={titleComponent} />
                    </div>
                    {/* Card — naik dari bawah, nutup title */}
                    <motion.div className="relative z-10" style={{ translateY: cardY }}>
                        <Card style={style}>
                            <div className="h-full w-full overflow-hidden rounded-lg bg-bg md:rounded-lg">
                                <motion.div className="pointer-events-none" ref={contentRef} style={{ translateY: contentY }}>
                                    {children}
                                </motion.div>
                            </div>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export const Header = ({ titleComponent }) => {
    return (
        <div className="text-center">
            {titleComponent}
        </div>
    )
}

export const Card = ({ style, children }) => {
    return (
        <motion.div
            style={{
                ...style,
                boxShadow: '0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003',
            }}
            className="max-w-5xl mx-auto h-[75vh] min-h-[30rem] w-full border border-border bg-surface/80 p-2 md:p-4 rounded-xl shadow-2xl"
        >
            <div className="h-full w-full overflow-hidden rounded-lg">
                {children}
            </div>
        </motion.div>
    )
}