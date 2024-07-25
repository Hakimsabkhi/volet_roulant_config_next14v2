import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        cwhite: 'var(--color-cwhite)',
        cblack: 'var(--color-cblack)',
        cbutton: 'var(--color-cbutton)',
        boxshadow: 'var(--color-boxshadow)',
        Navbutton: 'var(--color-Navbutton)',
        NavbuttonH: 'var(--color-NavbuttonH)'
      },
    },
  },
  plugins: [],
};
export default config;
