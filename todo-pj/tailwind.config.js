/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  content: ["./src/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "rgb(223, 77, 53)",
        secondary: "rgb(247, 218, 205)",
      },
    },
  },
  plugins: [],
};
