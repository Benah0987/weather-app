/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
      "./node_modules/rippleui/**/*.{js,ts,jsx,tsx}" // ✅ this line is important
    ],
    theme: {
      extend: {},
    },
    plugins: [
      require("rippleui") // ✅ add the RippleUI plugin here
    ],
  }
  