/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-navy": "#002855",
        "primary-orange": "#e3a112",
        "secondary-navy": "#0f5491",
        "primary-grey": "#333333",
        "background-grey": "#F8F8F8"
      }
    },
  },
  plugins: [],
}