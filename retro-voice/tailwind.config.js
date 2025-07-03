module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        retro: ["'Press Start 2P'", "monospace"]
      },
      colors: {
        overlay: 'rgba(0,0,0,0.05)'
      }
    },
  },
  plugins: [],
}; 