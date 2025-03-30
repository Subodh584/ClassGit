module.exports = {
  // ...existing config
  content: [
    // your content paths here
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // ...other extensions you might have
      animation: {
        blob: 'blob 7s infinite',
        float: 'float 20s infinite',
        wave: 'wave 15s ease-in-out infinite',
        'wave-reverse': 'wave-reverse 20s ease-in-out infinite',
        'fade-in-up': 'fade-in-up 0.4s ease-out forwards',
        pulse: 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        blob: {
          '0%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
          '33%': {
            transform: 'translate(30px, -50px) scale(1.1)',
          },
          '66%': {
            transform: 'translate(-20px, 20px) scale(0.9)',
          },
          '100%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
        },
        float: {
          '0%': {
            transform: 'translateY(0px) translateX(0px)',
            opacity: '0.2',
          },
          '50%': {
            transform: 'translateY(-40px) translateX(20px)',
            opacity: '0.3',
          },
          '100%': {
            transform: 'translateY(0px) translateX(0px)',
            opacity: '0.2',
          },
        },
        wave: {
          '0%': { transform: 'translateX(-100%)' },
          '50%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'wave-reverse': {
          '0%': { transform: 'translateX(100%)' },
          '50%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        pulse: {
          '0%': { opacity: '0.2' },
          '50%': { opacity: '0.4' },
          '100%': { opacity: '0.2' },
        },
      },
    },
  },
  plugins: [
    // any plugins you're using
  ],
}