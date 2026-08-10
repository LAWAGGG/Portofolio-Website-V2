export default function Loader() {
    return (
        <div id="loader">
            {/* Curtain panels — will be animated out by App.jsx */}
            <div id="loader-curtain-top"
                className="absolute inset-x-0 top-0"
                style={{ height: '50%', background: '#0d1117', zIndex: 2, transformOrigin: 'top' }}
            />
            <div id="loader-curtain-bot"
                className="absolute inset-x-0 bottom-0"
                style={{ height: '50%', background: '#0d1117', zIndex: 2, transformOrigin: 'bottom' }}
            />

            {/* Center content */}
            <div className="relative z-10 flex flex-col items-center gap-6">
                <p id="loader-name" style={{
                    fontFamily: "'Outfit','Space Grotesk',sans-serif",
                    fontWeight: 700,
                    fontSize: 'clamp(2rem,6vw,3.5rem)',
                    letterSpacing: '-0.03em',
                    color: '#e6edf3',
                }}>
                    Ahmad <span style={{ color: '#e8501a' }}>Faqih</span>
                </p>
                <div id="loader-bar-track" style={{ width: 160, height: 1, background: '#21262d' }}>
                    <div id="loader-bar" style={{ height: '100%', background: '#e8501a', width: 0, transition: 'width 0.05s linear' }} />
                </div>
                <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: '0.2em', color: '#3d4148', textTransform: 'uppercase' }}>
                    Loading portfolio
                </p>
            </div>
        </div>
    )
}
