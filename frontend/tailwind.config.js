/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#a8c6ff",
          200: "#97b2e6",
          300: "#869ecc",
          400: "#768bb3",
          500: "#657799",
          600: "#546380",
        },
        secondary: {
          100: "#dde0ff",
          200: "#d9dcff",
          300: "#d5d8ff",
          400: "#c0c2e6",
          500: "#aaadcc",
          600: "#9597b3",
        },
        hover: "#C0BAF5",

        black: "#212121",
      },
      fontFamily: {
        Montserrat: ["Montserrat, sans-serif"],
      },
      container: {
        padding: "1rem",
        center: true,
        screens: {
          sm: "640px",
          md: "780px",
          lg: "990px",
          xl: "1200px",
          "2xl": "13000px",
        },
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1037px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  plugins: [require("flowbite/plugin")],
};
