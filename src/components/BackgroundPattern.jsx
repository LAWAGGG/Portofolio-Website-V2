const ACCENT = '#e8501a'
const FG = '#e6edf3'

/*
 * Subtle, reusable background pattern for flat/empty sections.
 *
 *   <BackgroundPattern variant="grid" opacity={0.05} />
 *
 * variant: 'grid' | 'gridSm' | 'dots' | 'circuit'
 * Pattern grids fade to transparent toward the bottom so sections blend.
 * Patterns are decorative, pointer-events-none, and never exceed the given
 * opacity so text above stays readable.
 */

const gridMask = {
    WebkitMaskImage: 'linear-gradient(to bottom, #000 0%, transparent 92%)',
    maskImage: 'linear-gradient(to bottom, #000 0%, transparent 92%)',
}

export function BackgroundPattern({ variant = 'grid', opacity = 0.08, className = '' }) {
    const cls = `pointer-events-none absolute inset-0 select-none overflow-hidden ${className}`

    if (variant === 'dots') {
        return (
            <div
                className={cls}
                aria-hidden="true"
                style={{
                    backgroundImage: `radial-gradient(${ACCENT} 1.5px, transparent 1.5px)`,
                    backgroundSize: '26px 26px',
                    opacity,
                }}
            />
        )
    }

    if (variant === 'grid' || variant === 'gridSm') {
        return (
            <div
                className={cls}
                aria-hidden="true"
                style={{
                    backgroundImage:
                        `linear-gradient(rgba(230,237,243,${opacity}) 1px, transparent 1px),` +
                        `linear-gradient(90deg, rgba(230,237,243,${opacity}) 1px, transparent 1px)`,
                    backgroundSize: variant === 'gridSm' ? '48px 48px' : '84px 84px',
                    ...gridMask,
                }}
            />
        )
    }

    // variant === 'circuit'
    const segments = [
        { d: 'M 20 30 H 260 V 130 H 440', node: { x: 20, y: 30 } },
        { d: 'M 0 190 H 180 V 70 H 300', node: { x: 0, y: 190 } },
        { d: 'M 940 210 V 110 H 640 V 250', node: { x: 940, y: 210 } },
        { d: 'M 60 300 H 360 V 400 H 720', node: { x: 60, y: 300 } },
        { d: 'M 220 560 V 460 H 540 V 560', node: { x: 220, y: 560 } },
    ]
    return (
        <svg className={cls} aria-hidden="true" viewBox="0 0 960 600" preserveAspectRatio="xMidYMid slice" style={{ opacity }}>
            {segments.map((s, i) => (
                <g key={i}>
                    <path d={s.d} fill="none" stroke={ACCENT} strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
                    <circle cx={s.node.x} cy={s.node.y} r={3.5} fill={ACCENT} />
                </g>
            ))}
            <circle cx={920} cy={40} r={3} fill={FG} />
            <circle cx={40} cy={260} r={3} fill={FG} />
            <circle cx={760} cy={420} r={3} fill={FG} />
        </svg>
    )
}