/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary :  "#FDC546",
        secondary : "#0496BD"
      },
      boxShadow:{
        buttonShadow : "black 5px 5px"
      }
    },
  },
  plugins: [],
}