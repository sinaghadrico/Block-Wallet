import "../global.scss";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import Layout from "components/Layout";
import ProviderExample from "components/ProviderExample";

const colors = {
    primary: "#FFFFFF",
    secondary: "rgba(255, 255, 255, 0.75)",
    secondary_50: "rgba(255, 255, 255, 0.5)",
    secondary_25: "rgba(255, 255, 255, 0.25)",
    secondary_10: "rgba(255, 255, 255, 0.1)",
    secondary_5: "rgba(255, 255, 255, 0.05)",
    black: "#000000",
    black_secondary: "rgba(1, 1, 16, 0.75)",
    purple: "#5826E8",
    purpleLighter: "#9E7CFF",
    purpleDark: "rgba(88, 38, 232, 0.5)",
    purpleLight: "#A283FB",
    pink: "#D22BCC",
    pinkDark: "rgba(210, 43, 204, 0.5)",
    blue: "#2878F0",
    green: "#27D46C",
    red: "#EB5757",
    yellow: "#FFD335",
    gray: "gray",
};
const theme = {
    colors: colors,
    buttons: {
        gray: {
            filled: {
                background: colors["secondary_25"],
                color: colors["primary"],
                boxShadow: "rgba(255, 255, 255, 0.25)",
                backgroundIcon: colors["secondary_25"],
            },
            outline: {
                background: colors["primary"],
                color: "black",
                boxShadow: "rgba(255, 255, 255, 0.25)",
                backgroundIcon: colors["secondary_25"],
            },
        },
        purple: {
            filled: {
                background: colors["purple"],
                color: colors["primary"],
                boxShadow: "rgba(88, 38, 232, 0.5)",
                backgroundIcon: "#bca8f6",
            },
            outline: {
                background: colors["primary"],
                color: colors["purple"],
                boxShadow: "rgba(88, 38, 232, 0.5)",
                backgroundIcon: "#bca8f6",
            },
        },
        purpleLighter: {
            filled: {
                background: colors["purpleLighter"],
                color: colors["primary"],
                boxShadow: "rgba(88, 38, 232, 0.5)",
                backgroundIcon: "#e480e0",
            },
            outline: {
                background: colors["primary"],
                color: colors["purpleLighter"],
                boxShadow: "rgba(88, 38, 232, 0.5)",
                backgroundIcon: "#e480e0",
            },
        },
        pink: {
            filled: {
                background: colors["pink"],
                color: colors["primary"],
                boxShadow: "rgba(210, 43, 204, 0.5)",
                backgroundIcon: "#e480e0",
            },
            outline: {
                background: colors["primary"],
                color: colors["pink"],
                boxShadow: "rgba(210, 43, 204, 0.5)",
                backgroundIcon: "#e480e0",
            },
        },
        blue: {
            filled: {
                background: colors["blue"],
                color: colors["primary"],
                boxShadow: "rgba(2, 133, 254, 0.5)",
                backgroundIcon: colors["blue"],
            },
            outline: {
                background: colors["primary"],
                color: colors["blue"],
                boxShadow: "rgba(2, 133, 254, 0.5)",
                backgroundIcon: colors["blue"],
            },
        },
        green: {
            filled: {
                background: colors["green"],
                color: colors["primary"],
                boxShadow: "rgba(102, 240, 157, 0.5)",
                backgroundIcon: colors["green"],
            },
            outline: {
                background: colors["primary"],
                color: colors["green"],
                boxShadow: "rgba(102, 240, 157, 0.5)",
                backgroundIcon: colors["green"],
            },
        },
    },
    // text-xs	font-size: 0.75rem; /* 12px */
    // line-height: 1rem; /* 16px */
    // text-sm	font-size: 0.875rem; /* 14px */
    // line-height: 1.25rem; /* 20px */
    // text-base	font-size: 1rem; /* 16px */
    // line-height: 1.5rem; /* 24px */
    // text-lg	font-size: 1.125rem; /* 18px */
    // line-height: 1.75rem; /* 28px */
    // text-xl	font-size: 1.25rem; /* 20px */
    // line-height: 1.75rem; /* 28px */
    // text-2xl	font-size: 1.5rem; /* 24px */
    // line-height: 2rem; /* 32px */
    // text-3xl	font-size: 1.875rem; /* 30px */
    // line-height: 2.25rem; /* 36px */
    // text-4xl	font-size: 2.25rem; /* 36px */
    // line-height: 2.5rem; /* 40px */
    // text-5xl	font-size: 3rem; /* 48px */
    // line-height: 1;
    // text-6xl	font-size: 3.75rem; /* 60px */
    // line-height: 1;
    // text-7xl	font-size: 4.5rem; /* 72px */
    // line-height: 1;
    // text-8xl	font-size: 6rem; /* 96px */
    // line-height: 1;
    // text-9xl	font-size: 8rem; /* 128px */
    // line-height: 1;
    fonts: {
        xs: { size: ".75rem", weight: "300", style: "normal" },
        sm: { size: ".875rem", weight: "400", style: "normal" },
        tiny: { size: ".875rem", weight: "700", style: "normal" },
        base: { size: "1rem", weight: "600", style: "normal" },
        lg: { size: "1.125rem", weight: "700", style: "normal" },
        xl: { size: "1.25rem", weight: "400", style: "normal" },
        "2xl": { size: "1.5rem", weight: "700", style: "normal" },
        "3xl": { size: "1.875rem", weight: "700", style: "normal" },
        "4xl": { size: "2.25rem", weight: "900", style: "normal" },
        "5xl": { size: "3rem", weight: "900", style: "normal" },
        "6xl": { size: "4rem", weight: "900", style: "normal" },
        "7xl": { size: "5rem", weight: "900", style: "normal" },
    },
};

export default function MyApp({ Component, pageProps }) {
    const GlobalStyle = createGlobalStyle`
    body {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      color: ${theme.colors?.["primary"]};
      /* filter: invert(1) hue-rotate(180deg); */
  
      ::-webkit-scrollbar {
              width: 8px;
              height: 8px;
          }
  
          ::-webkit-scrollbar-track {
              box-shadow: inset 0 0 5px  ${theme.colors?.["secondary_10"]};
          }
  
          ::-webkit-scrollbar-thumb {
              background: ${theme.colors["blue"]};
          }
  
          ::-webkit-scrollbar-thumb:hover {
              background:  ${theme.colors["blue"]};
          }
    }
  `;

    return (
        <>
            <GlobalStyle />

            <ThemeProvider theme={theme}>
                <ProviderExample>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </ProviderExample>
            </ThemeProvider>
        </>
    );
}
