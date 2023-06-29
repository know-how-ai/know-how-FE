import { GlobalStyle } from "../components/styles/global-style";
import { darkTheme, lightTheme } from "../components/styles/theme";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import Head from "next/head";
import { wrapper } from "../contexts/store";
import { useUISelector } from "../contexts/uiSlice";
import React from "react";

const App = ({ Component, pageProps }: AppProps) => {
    const { isDarkmode } = useUISelector((state) => state.ui);

    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </Head>
            <GlobalStyle />

            <ThemeProvider theme={isDarkmode ? darkTheme : lightTheme}>
                <Component {...pageProps} />
            </ThemeProvider>
        </>
    );
};

export default wrapper.withRedux(App); // for SSR(getInitialProps | getServerSideProps)
