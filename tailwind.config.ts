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
        rootSb: "#1A365D",
        iconSb: "#4299E1",
        active: "#38A169",
        avaBg: "#EBF8FF",
        buttonBlue: "#3182CE",
        ssbMain: "#F2F2F6",
        ssbMainFsDiv: "#FAFAFA",
      },
      height: {
        rootSb: "51.563rem",
        widthCb: "4.5rem",
        heightAva: "1.75rem",
        height3x3: "12.5rem",
        heightBlockIcon: "3.75rem",
        heightCreate: "8.65rem",
        heightCreateBlock: "6.25rem",
        heightAvatar: "33rem",
        heightAvaFocus: "11.313rem",
        heightChangeProfile: "4.5rem",
      },
      width: {
        rootSb: "4rem",
        heightCb: "4.5rem",
        widthAva: "1.75rem",
        width3x3: "27.5rem",
        widthBlockIcon: "8.125rem",
        widthCreate: "32rem",
        widthCreateBlock: "9.625rem",
        widthAvatar: "41.5rem",
        widthAvaFocus: "11.313rem",
        widthAvaDiv: "32rem",
        widthChangeProfile: "32rem",
        widthSSb: "17.875rem"
      },
      borderRadius: {
        popular: "20px",
        profileChange: "8px",
      },
      fontFamily: {
        spa: ["var(--font-spa)"],
      },
      fontSize: {
        normal: "16px",
        avaName: "24px",
      },
      padding: {
        ava: "30px",
      },
      rotate: {
        "270": "270deg",
      },
      inset: {
        "30": "30px",
      },
      boxShadow: {
        ssbFsDiv: "0px 4px 98px rgba(74, 72, 72, 0.21)",
      }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
export default config;