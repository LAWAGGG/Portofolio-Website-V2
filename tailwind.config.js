/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,jsx}'],
    theme: {
        extend: {
            colors: {
                bg: '#0d1117',
                surface: '#161b22',
                border: '#21262d',
                muted: '#3d4148',
                dim: '#8b949e',
                fg: '#e6edf3',
                accent: '#e8501a',
                'accent-dim': '#7a2a0d',
            },
            fontFamily: {
                display: ['"Outfit"', '"Space Grotesk"', 'sans-serif'],
                body: ['"Space Grotesk"', 'sans-serif'],
                mono: ['"JetBrains Mono"', '"Space Mono"', 'monospace'],
            },
            fontSize: {
                '10xl': ['10rem', { lineHeight: '1' }],
                '11xl': ['12rem', { lineHeight: '1' }],
                '12xl': ['14rem', { lineHeight: '1' }],
            },
            letterSpacing: {
                tightest: '-0.04em',
                tighter: '-0.03em',
                tight: '-0.02em',
            },
        },
    },
    plugins: [],
}
