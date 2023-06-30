import { GlobalStyle } from "@components/styles/global-style";
import type { AppProps } from "next/app";
import Head from "next/head";
import { wrapper } from "@contexts/store";
import { Provider } from "react-redux";

const App = ({ Component, ...rest }: AppProps) => {
    const { store, props } = wrapper.useWrappedStore(rest); // for SSR(getInitialProps | getServerSideProps)

    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </Head>
            <Provider store={store}>
                <GlobalStyle />
                <Component {...props?.pageProps} />
            </Provider>
        </>
    );
};

export default App;
