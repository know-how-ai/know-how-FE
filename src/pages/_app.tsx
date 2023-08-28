import { GlobalStyle } from "@components/styles/global-style";
import type { AppProps } from "next/app";
import Head from "next/head";
import { wrapper } from "@contexts/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

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
                <PersistGate loading={null} persistor={persistStore(store)}>
                    <GlobalStyle />
                    <Component {...props?.pageProps} />
                </PersistGate>
            </Provider>
        </>
    );
};

export default App;

export const metadata = {
    icons: {
        icon: "/favicon.ico",
    },
};
