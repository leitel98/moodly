/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}",
],
  theme: {
    extend: {
      colors: {
        charcoal: "#344d65",
        darkCharcoal: "#2a3e50",
        pomelo: "#e26d5a",
        syrah: "#995fab",
        swamp: "#83b692"
      },
      spacing: {
        128: "32rem"
      },
      fontFamily: {
        sans: ["Mulish", "sans-serif"],
        mono: ["Rokkit", "monospace"],
      }
    },
  },
  plugins: [],
}
