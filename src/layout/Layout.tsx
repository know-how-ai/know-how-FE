import Head from "next/head";
import { useRouter } from "next/router";
import type { FC, ReactNode } from "react";
import styled from "styled-components";

interface Props {
    children: ReactNode;
    title: string;
}

const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 1rem;
    position: sticky;
    width: 100%;
    background-color: ${(props) => props.theme.color.backgroundColor};
    color: ${(props) => props.theme.color.textColor};
    transition: ${(props) => props.theme.transition.fast};
    filter: ${(props) => props.theme.filter.blur};
`;

const Main = styled.main`
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    overflow-x: hidden;
    background-color: ${(props) => props.theme.color.backgroundColor};
    color: ${(props) => props.theme.color.textColor};
    transition: ${(props) => props.theme.transition.fast};
    filter: ${(props) => props.theme.filter.blur};
`;

const Footer = styled.footer`
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 1rem;
    width: 100%;
    background-color: ${(props) => props.theme.color.backgroundColor};
    color: ${(props) => props.theme.color.textColor};
    transition: ${(props) => props.theme.transition.fast};
    filter: ${(props) => props.theme.filter.blur};
`;

const Layout: FC<Props> = ({ children, title }) => {
    const router = useRouter();

    return (
        <>
            <Head>
                <title>{`${title} | Galaxy Market`}</title>
            </Head>
            <>
                <Header>
                    <div>헤더헤더</div>
                </Header>

                <Main>{children}</Main>

                <Footer>
                    <div>푸터푸터</div>
                </Footer>
            </>
        </>
    );
};

export default Layout;
