/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#b58863",
        secondary: "#f0d9b5",
        dark: "#161512",
      },
    },
  },
  plugins: [],
};
