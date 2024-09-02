/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      xxs: "100px",
      xs: "321px",
      sm: "480px",
      md: "768px",
      lg: "1024px",
      xl: "1440px"
    },
    fontFamily: {
      Heebo: ["Heebo", "sans-serif"],
      LatoBold: "LatoBold",
      LatoRegular: "LatoRegular",
      MontserratBold: " MontserratBold",
      MontserratItalicVariableFont_wght: "MontserratItalicVariableFont_wght",
      MontserratSemiBold: "MontserratSemiBold",
      MontserratVariableFont_wght: "MontserratVariableFont_wght",
      SpectralBold: "SpectralBold",
      SpectralRegular: "SpectralRegular",
      SpectralSemiBold: "SpectralSemiBold",
      GilroyLightItalic: "GilroyLightItalic",
      GilroyMedium: "GilroyMedium",
      GilroyMediumItalic: "GilroyMediumItalic",
      GilroyRegular: "GilroyRegular",
      GilroyRegularItalic: "GilroyRegularItalic",
      GilroySemiBold: "GilroySemiBold",
      GilroyUltraLight: "GilroyUltraLight",
      GilroyUltraLightItalic: "GilroyUltraLightItalic"
    },
    fontSize: {
      xl: ["20px"],
      lg: ["16px"],
      base: ["12px"],
      sm: [
        "10px",
        {
          fontWeight: "500"
        }
      ]
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "#047232",
          100: "#008753"
        },
        red: {
          DEFAULT: "#FF0000",
          100: "#F6DBCC"
        },
        green: {
          DEFAULT: "#50c878",
          100: "#C7E8D2"
        },
        gray: {
          DEFAULT: "#48484A",
          100: "#D1D1D6",
          200: "#8E8E93",
          300: "#25373f"
        },
        pine: "#005C39",
        bluebg: "#0E78F9",
        black: {
          DEFAULT: "#000000",
          100: "#041723"
        },
        brown: {
          DEFAULT: "#9D3C0B",
          100: "#fbafaf"
        },
        yellow: {
          DEFAULT: "#e6f70f",
          100: "#c1c100"
        },
        citrus: "#F26D21",
        background: "#F7F7F7",
        orange: "#F26D21",
        alerts: {
          success: {
            color: "#20a020",
            bgColor: "#E0FFE0"
          },
          info: {
            color: "#FFFFFF",
            bgColor: "#4299e1"
          },
          error: {
            color: "#C5302E",
            bgColor: "#fff5f5",
            border: "#cbd5e0"
          }
        }
      }
    },
    container: {
      center: true
    }
  },
  plugins: []
};
