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
      boxShadow: {
        'card': '0 8px 32px hsla(350, 89%, 60%, 0.15)',
        'elevated': '0 12px 48px hsla(0, 0%, 0%, 0.4)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-in',
        'scale-in': 'scaleIn 0.25s ease',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}