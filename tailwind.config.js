/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6366F1',
        secondary: '#8B5CF6',
        accent: '#EC4899',
        surface: '#F8FAFC',
        background: '#FFFFFF',
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6'
      },
      fontFamily: {
        display: ['Plus Jakarta Sans', 'ui-sans-serif', 'system-ui'],
        body: ['Inter', 'ui-sans-serif', 'system-ui'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui']
      },
      animation: {
        'checkbox-fill': 'checkbox-fill 0.3s ease-out forwards',
        'checkmark': 'checkmark 0.2s ease-out 0.1s forwards',
        'task-complete': 'task-complete 0.4s ease-out forwards',
        'progress-ring': 'progress-ring 0.5s ease-out forwards'
      },
      keyframes: {
        'checkbox-fill': {
          '0%': { transform: 'scale(1)', backgroundColor: 'transparent' },
          '50%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)', backgroundColor: '#10B981' }
        },
        'checkmark': {
          '0%': { strokeDasharray: '0 20', opacity: '0' },
          '100%': { strokeDasharray: '20 20', opacity: '1' }
        },
        'task-complete': {
          '0%': { opacity: '1', transform: 'translateX(0)' },
          '100%': { opacity: '0.6', transform: 'translateX(8px)' }
        },
        'progress-ring': {
          '0%': { strokeDasharray: '0 283' },
          '100%': { strokeDasharray: 'var(--progress) 283' }
        }
      }
    },
  },
  plugins: [],
}