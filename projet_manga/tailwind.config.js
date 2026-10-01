/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        ink: "var(--color-ink)",
        background: "var(--color-background)",
        outline: "var(--color-outline)",
        primary: "var(--color-primary)",
        surface: "var(--color-surface)",
        accent: "var(--color-accent)",
        deep: "var(--color-deep)",
        night: "var(--color-night)",
        shade: "var(--color-shade)",
      },
      fontFamily: {
        bungee: ["Bungee_400Regular"],
        poppins: ["Poppins_400Regular"],
        "poppins-bold": ["Poppins_700Bold"],
        "inter-light": ["Inter_300Light"],
        inter: ["Inter_400Regular"],
        "inter-medium": ["Inter_500Medium"],
        "inter-semibold": ["Inter_600SemiBold"],
      },
    },
  },
  plugins: [],
}
