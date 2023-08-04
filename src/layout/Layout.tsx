import {
    CircleButton,
    LoginIcon,
    Modal,
    MoonIcon,
    SunIcon,
    Toast,
} from "@components/atoms";
import { LoginOrJoinForm } from "@components/molecules";
import { darkTheme, lightTheme } from "@components/styles/theme";
import { useAppDispatch } from "@contexts/contextHooks";
import {
    offDarkmode,
    offModal,
    onDarkmode,
    onModal,
    useUISelector,
} from "@contexts/uiSlice";
import Head from "next/head";
import {
    useCallback,
    type FC,
    type ReactNode,
    useEffect,
    useState,
} from "react";
import styled, { ThemeProvider } from "styled-components";

interface LayoutProps {
    children: ReactNode;
    title: string;
}

const Logo = styled.span`
    display: inline-block;
    font-weight: 600;
    /* font-style: italic; */
    font-size: ${(p) => p.theme.size.lg};
    margin: auto ${(p) => p.theme.size.xl};
    color: ${(p) => p.theme.color.textColor};
    user-select: none;
`;

const Nav = styled.nav`
    margin: auto ${(p) => p.theme.size.xl};
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const UList = styled.ul`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
`;

const ListItem = styled.li`
    list-style: none;
`;

const Header = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    background-color: ${(p) => p.theme.color.backgroundColor + "aa"};
    color: ${(p) => p.theme.color.textColor};
    transition: ${(p) => p.theme.transition.fast};
    z-index: 10;
    min-height: 8rem;
    border-bottom: ${(p) => p.theme.border.active};
    backdrop-filter: blur(1px);
    box-shadow: ${(p) => p.theme.boxShadow.strong};
`;

const Main = styled.main`
    padding-top: 12rem; // 8 + 4
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 85vh;
    overflow-x: auto;
    background-color: ${(props) => props.theme.color.backgroundColor};
    color: ${(props) => props.theme.color.textColor};
    transition: ${(props) => props.theme.transition.fast};
    filter: ${(props) => props.theme.filter.blur};
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
    /* border-top: ${(p) => p.theme.border.active}; */
    height: 12rem;
    overflow: hidden;
`;

const Copyright = styled.span`
    font-style: italic;
    font-size: 1rem;
    color: ${(p) => p.theme.color.gray};
`;

const Layout: FC<LayoutProps> = ({ children, title }) => {
    const dispatch = useAppDispatch();
    const { isDarkmode, showModal } = useUISelector((state) => state.ui);

    const [toast, setToast] = useState(false);

    const toggleThemeMode = useCallback(() => {
        dispatch(isDarkmode ? offDarkmode() : onDarkmode());
    }, [isDarkmode]);

    const memorizedOnModal = useCallback(() => {
        dispatch(onModal());
    }, [onModal]);
    const memorizedOffModal = useCallback(() => {
        dispatch(offModal());
    }, [offModal]);

    // 페이지 이동 시, 모달은 OFF 상태에서 시작
    useEffect(() => {
        memorizedOffModal();
    }, []);

    return (
        <>
            <Head>
                <title>{`${title} - Blogify`}</title>
            </Head>

            <ThemeProvider theme={isDarkmode ? darkTheme : lightTheme}>
                <Header>
                    <Logo>Know How</Logo>
                    <Nav>
                        <UList>
                            <ListItem>
                                <CircleButton onClick={toggleThemeMode}>
                                    {isDarkmode ? <MoonIcon /> : <SunIcon />}
                                </CircleButton>
                            </ListItem>

                            <ListItem>
                                <CircleButton onClick={memorizedOnModal}>
                                    <LoginIcon />
                                </CircleButton>
                            </ListItem>
                        </UList>
                    </Nav>
                </Header>

                <Main>
                    {children}

                    {showModal ? (
                        <Modal handleClose={memorizedOffModal}>
                            <LoginOrJoinForm
                                onSuccess={() => {
                                    setToast(true);
                                }}
                            />
                        </Modal>
                    ) : null}

                    {toast ? (
                        <Toast
                            isShow={toast}
                            duration={3000}
                            handleClose={() => {
                                setToast(false);
                            }}
                        >
                            로그인 성공!
                        </Toast>
                    ) : null}
                </Main>

                <Footer>
                    <Copyright>{`Copyright 2023. Blogify. All rights reserved.`}</Copyright>
                </Footer>
            </ThemeProvider>
        </>
    );
};

export default Layout;
