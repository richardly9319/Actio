/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-color": "#F4F4F6",
        "secondary-color": "#E6E6E9",
        "tertiary-color": "#9999A1",
        "quaternary-color": "#66666E",
        "quinary-color": "#000000",
        "color-teal": "#335C67"
        

      }
    },
  },
  plugins: [],
}