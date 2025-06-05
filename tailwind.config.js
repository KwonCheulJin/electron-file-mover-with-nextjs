/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        fadeOut: {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
        rainbow: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-out': 'fadeOut 3s forwards',
        rainbow: 'rainbow 8s ease-in-out infinite',
      },
      backgroundSize: {
        rainbow: '400% 400%',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
  // Electron 환경에서 JIT 모드 강제 활성화
  mode: 'jit',
  // 중요도 설정으로 스타일 우선순위 보장
  important: true,
  safelist: [
    // document
    'bg-blue-100',
    'text-blue-800',
    'dark:bg-blue-900',
    'dark:text-blue-300',

    // presentation
    'bg-orange-100',
    'text-orange-800',
    'dark:bg-orange-900',
    'dark:text-orange-300',

    // spreadsheet
    'bg-green-100',
    'text-green-800',
    'dark:bg-green-900',
    'dark:text-green-300',

    // image
    'bg-purple-100',
    'text-purple-800',
    'dark:bg-purple-900',
    'dark:text-purple-300',

    // audio
    'bg-pink-100',
    'text-pink-800',
    'dark:bg-pink-900',
    'dark:text-pink-300',

    // video
    'bg-red-100',
    'text-red-800',
    'dark:bg-red-900',
    'dark:text-red-300',

    // code
    'bg-indigo-100',
    'text-indigo-800',
    'dark:bg-indigo-900',
    'dark:text-indigo-300',

    // data
    'bg-yellow-100',
    'text-yellow-800',
    'dark:bg-yellow-900',
    'dark:text-yellow-300',

    // config
    'bg-gray-100',
    'text-gray-800',
    'dark:bg-gray-900',
    'dark:text-gray-300',

    // archive
    'bg-teal-100',
    'text-teal-800',
    'dark:bg-teal-900',
    'dark:text-teal-300',

    // executable
    'bg-cyan-100',
    'text-cyan-800',
    'dark:bg-cyan-900',
    'dark:text-cyan-300',
  ],
};
