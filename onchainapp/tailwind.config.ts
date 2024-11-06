import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    // "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: ({ colors }) => ({
        inherit: colors.inherit,
        current: colors.current,
        transparent: colors.transparent,
        white: colors.white,
        slate: colors.slate,
        green: colors.green,
        emerald: colors.emerald,
        white1: "#F9F4F4", //custom white
        "kimnavy": "#507687",
        "kimwhite": "#FCFAEE",
        "kimred": "#B8001F",
        "kimdeepnavy": "#384B70",
        /** functional */
        "snow": "#FFFFFF",
        "onyx": "#000000",
        "success": "#329F3B",
        "error": "#E70532",
        "disabled": "#9B9B9B",
        /** accent */
        // "sky": "#7CC0FF",
      }),
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
export default config;
