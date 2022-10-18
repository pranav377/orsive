module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    ripple: (theme) => ({
      colors: theme("colors"),
    }),
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwindcss-ripple")(),
    require("@tailwindcss/forms"),
  ],
};
