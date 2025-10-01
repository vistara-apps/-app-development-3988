/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: 'hsl(0, 0%, 5%)',
        text: 'hsl(0, 0%, 98%)',
        accent: 'hsl(280, 100%, 70%)',
        border: 'hsl(0, 0%, 20%)',
        primary: 'hsl(350, 89%, 60%)',
        success: 'hsl(142, 76%, 36%)',
        surface: 'hsl(0, 0%, 10%)',
        warning: 'hsl(38, 92%, 50%)',
        textMuted: 'hsl(0, 0%, 65%)',
        primaryHover: 'hsl(350, 89%, 55%)',
        surfaceElevated: 'hsl(0, 0%, 14%)',
      },
      borderRadius: {
        'lg': '20px',
        'md': '12px',
        'sm': '8px',
      },
      boxShadow: {
        'card': '0 8px 32px hsla(350, 89%, 60%, 0.15)',
        'elevated': '0 12px 48px hsla(0, 0%, 0%, 0.4)',
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-in',
        'slide-up': 'slideUp 0.25s ease',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}