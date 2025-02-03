/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "cart-attention": "cart-attention 1s ease-in-out",
      },
      keyframes: {
        "cart-attention": {
          "0%": {
            transform: "scale(1) translateY(0)",
            filter: "drop-shadow(0 0 0 rgba(37, 99, 235, 0))",
          },
          "25%": {
            transform: "scale(1.2) translateY(-15%)",
            filter: "drop-shadow(0 0 8px rgba(37, 99, 235, 0.5))",
          },
          "50%": {
            transform: "scale(1.2) translateY(0)",
            filter: "drop-shadow(0 0 12px rgba(37, 99, 235, 0.8))",
          },
          "75%": {
            transform: "scale(1.1) translateY(-5%)",
            filter: "drop-shadow(0 0 8px rgba(37, 99, 235, 0.5))",
          },
          "100%": {
            transform: "scale(1) translateY(0)",
            filter: "drop-shadow(0 0 0 rgba(37, 99, 235, 0))",
          },
        },
      },
    },
  },
  plugins: [],
};
