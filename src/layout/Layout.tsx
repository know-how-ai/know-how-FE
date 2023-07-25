import { Header } from "@components/organics";
import { darkTheme, lightTheme } from "@components/styles/theme";
import { useAppDispatch } from "@contexts/contextHooks";
import { offDarkmode, onDarkmode, useUISelector } from "@contexts/uiSlice";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, type FC, type ReactNode } from "react";
import styled, { ThemeProvider } from "styled-components";

interface Props {
    children: ReactNode;
    title: string;
}

const Main = styled.main`
    display: flex;
    justify-content: center;
    flex-direction: column;

    width: 100%;
    overflow-x: auto;
    background-color: ${(props) => props.theme.color.backgroundColor};
    color: ${(props) => props.theme.color.textColor};
    transition: ${(props) => props.theme.transition.fast};
    filter: ${(props) => props.theme.filter.blur};
    height: 80vh;
`;

const Footer = styled.footer`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    background-color: ${(props) => props.theme.color.backgroundColor};
    color: ${(props) => props.theme.color.textColor};
    transition: ${(props) => props.theme.transition.fast};
    filter: ${(props) => props.theme.filter.blur};
    height: 10vh;
    border-top: ${(p) => p.theme.border.active};
`;

const Copyright = styled.span`
    font-style: italic;
    font-size: 1rem;
    color: ${(p) => p.theme.color.gray};
`;

const Layout: FC<Props> = ({ children, title }) => {
    const { isDarkmode } = useUISelector((state) => state.ui);
    const dispatch = useAppDispatch();

    const toggleThemeMode = useCallback(() => {
        dispatch(isDarkmode ? offDarkmode() : onDarkmode());
    }, [isDarkmode]);

    return (
        <>
            <Head>
                <title>{`'${title}' - Blogify`}</title>
            </Head>

            <ThemeProvider theme={isDarkmode ? darkTheme : lightTheme}>
                <Header
                    isDarkmode={isDarkmode}
                    toggleThemeMode={toggleThemeMode}
                />

                <Main>{children}</Main>

                <Footer>
                    <Copyright>{`Copyright 2023. Blogify. All rights reserved.`}</Copyright>
                </Footer>
            </ThemeProvider>
        </>
    );
};

export default Layout;
