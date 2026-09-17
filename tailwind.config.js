/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        display: ['"Poppins"', 'sans-serif'],
        premium: ['"Cormorant"', 'serif'],
      },
      colors: {
        // Northbeam — base operativo (dashboard, formularios, superficies)
        primary: {
          DEFAULT: '#2563EB',
          50: '#EFF6FF',
          100: '#DBEAFE',
          500: '#2563EB',
          600: '#1D4ED8',
          700: '#1E40AF',
        },
        secondary: {
          DEFAULT: '#6366F1',
          100: '#E0E7FF',
          500: '#6366F1',
        },
        // Fiesta Signal — energía de marca en superficies públicas
        brand: {
          DEFAULT: '#EA580C',
          orange: '#EA580C',
          orangeLight: '#F97316',
          rose: '#E11D48',
        },
        // Onyx & Gold — tratamiento premium reservado
        premium: {
          bg: '#1C1917',
          surface: '#44403C',
          gold: '#A16207',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          muted: '#F8FAFC',
          dark: '#0B0B10',
          darkCard: 'rgba(255,255,255,0.05)',
        },
        border: {
          DEFAULT: '#E2E8F0',
          dark: 'rgba(255,255,255,0.10)',
        },
        success: '#059669',
        warning: '#D97706',
        danger: '#DC2626',
      },
      borderRadius: {
        sm: '10px',
        md: '16px',
        lg: '24px',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.16,1,0.3,1)',
      },
      keyframes: {
        floatA: {
          '0%,100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-22px) scale(1.04)' },
        },
        floatB: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(18px)' },
        },
        fadeUp: {
          from: { opacity: 0, transform: 'translateY(18px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        floatA: 'floatA 22s ease-in-out infinite',
        floatB: 'floatB 26s ease-in-out infinite',
        fadeUp: 'fadeUp .55s cubic-bezier(0.16,1,0.3,1) both',
      },
    },
  },
  plugins: [],
};
