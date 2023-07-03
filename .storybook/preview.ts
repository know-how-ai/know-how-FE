import type { Preview } from "@storybook/react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { withThemeFromJSXProvider } from "@storybook/addon-styling";
import { lightTheme, darkTheme } from "../src/components/styles/theme";

/* TODO: update import for your custom theme configurations */
// import { lightTheme, darkTheme } from '../path/to/themes';

/* TODO: replace with your own global styles, or remove */
const GlobalStyles = createGlobalStyle`
    body {
      font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    }
  `;

const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: "^on[A-Z].*" },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
    },

    decorators: [
        // Adds global styles and theme switching support.
        withThemeFromJSXProvider({
            /* Uncomment for theme switching support */
            themes: {
                light: lightTheme,
                dark: darkTheme,
            },
            defaultTheme: "light",
            Provider: ThemeProvider,
            GlobalStyles,
        }),
    ],
};

export default preview;
