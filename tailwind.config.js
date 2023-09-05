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
        "primary-red": "#D9534F",
        "primary-green": "#008080",
        "primary-grey": "#333333",
        "background-grey": "#F8F8F8"
      }
    },
  },
  plugins: [],
}