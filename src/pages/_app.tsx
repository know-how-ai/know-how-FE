import { GlobalStyle } from "@/components/styles/global-style";
import { theme } from "@/components/styles/theme";
import wrapper from "@/contexts/configureStore";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import Head from "next/head";

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </Head>
            <GlobalStyle />
            <ThemeProvider theme={theme}>
                <Component {...pageProps} />
            </ThemeProvider>
        </>
    );
};

export default wrapper.withRedux(App);
