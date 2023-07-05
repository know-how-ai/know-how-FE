import { darkTheme, lightTheme } from "@components/styles/theme";
import { useUISelector } from "@contexts/uiSlice";
import Head from "next/head";
import { useRouter } from "next/router";
import type { FC, ReactNode } from "react";
import styled, { ThemeProvider } from "styled-components";

interface Props {
    children: ReactNode;
    title: string;
}

const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-around;
    position: sticky;
    width: 100%;
    background-color: ${(props) => props.theme.color.backgroundColor};
    color: ${(props) => props.theme.color.textColor};
    transition: ${(props) => props.theme.transition.fast};
    filter: ${(props) => props.theme.filter.blur};
    height: 10vh;
`;

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
`;

const Layout: FC<Props> = ({ children, title }) => {
    // const router = useRouter();
    const { isDarkmode } = useUISelector((state) => state.ui);

    return (
        <>
            <Head>
                <title>{`${title} | Galaxy Market`}</title>
            </Head>

            <ThemeProvider theme={isDarkmode ? darkTheme : lightTheme}>
                <Header>
                    <div>헤더헤더</div>
                </Header>

                <Main>{children}</Main>

                <Footer>
                    <div>푸터푸터</div>
                </Footer>
            </ThemeProvider>
        </>
    );
};

export default Layout;
