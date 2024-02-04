/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      mytheme: {
        primary: "#c084fc",
        secondary: "#f0abfc",
        accent: "#67e8f9",
        neutral: "#d6d3d1",
        "base-100": "#e5e7eb",
        info: "#67e8f9",
        success: "#86efac",
        warning: "#fde047",
        error: "#fda4af",
      },
    },
  },
  plugins: [require("daisyui")],
};
