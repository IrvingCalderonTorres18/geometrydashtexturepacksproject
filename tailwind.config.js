/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      'black-important': 'black !important',
    },
  },
  plugins: [require("daisyui")],
}