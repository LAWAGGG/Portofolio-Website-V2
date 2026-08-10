export default function AsciiArt({ className = '' }) {
    return (
        <video
            className={className}
            src={'https://assets.21st.dev/ascii-recipes/videos/user_3HgdEeKGCVNhWWoCeJ53q1fDQCD/d10d3128-eb57-4c90-af3c-cd3a2ad651ec.mp4'}
            poster={'https://assets.21st.dev/ascii-recipes/thumbnails/user_3HgdEeKGCVNhWWoCeJ53q1fDQCD/bf6f766e-747f-46dd-af14-6390b7eae845.webp'}
            autoPlay
            loop
            muted
            playsInline
            aria-label={'qweqw — animated ASCII art'}
            style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
        />
    )
}