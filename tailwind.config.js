/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
        emoji: ["Noto Emoji", "sans-serif"],
      },
      colors: {
        primaryBlue: "#0B192C",
      },
      keyframes: {
        slideDownFadeIn: {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideUpFadeIn: {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideLeftFadeIn: {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        slideRightFadeIn: {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
      },
      animation: {
        slideDownFadeIn: "slideDownFadeIn 1s ease-in-out",
        slideUpFadeIn: "slideUpFadeIn 1s ease-in-out",
        slideLeftFadeIn: "slideLeftFadeIn 1s ease-in-out",
        slideRightFadeIn: "slideRightFadeIn 1s ease-in-out",
      },
      boxShadow: {
        "blue-lg": "0 0 15px 5px rgba(51, 117, 200, 0.5)",
        "orange-lg": "0 0 15px 5px rgba(177, 101, 30, 0.5)",
        "green-lg": "0 0 15px 5px rgba(62, 144, 85, 0.5)",
        "purple-lg": "0 0 15px 5px rgba(126, 84, 166, 0.5)",
        "white-lg": "0 0 15px 5px rgba(255, 255, 255, 0.5)",
        "gray-lg": "0 0 15px 5px rgba(117, 117, 117, 0.5)",
        "red-lg": "0 0 15px 5px rgba(255, 0, 0, 0.5)",
      },
      zIndex: {
        ...Array.from({ length: 30 }, (_, i) => i + 1).reduce((acc, val) => {
          acc[val] = val;
          return acc;
        }, {}),
      },
    },
  },
  plugins: [],
};
