/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['CustomFont', 'sans-serif'], // Replace 'CustomFont' with your font name
        mono: ['JetBrains Mono', 'monospace'],
        popo:["Poppins", 'sans-serif'],
      },
      screens: {
        '110': '2112px', // Replace with your calculated pixel value
      },
    },
  },
  plugins: [],
}

