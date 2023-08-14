import Head from "next/head";
import {
    CircleButton,
    MoonIcon,
    SunIcon,
    Toast,
    UserIcon,
} from "@components/atoms";
import { AuthModal, ProfileModal } from "@components/organics";
import { darkTheme, lightTheme } from "@components/styles/theme";
import { useAppDispatch } from "@contexts/contextHooks";
import {
    offDarkmode,
    offModal,
    onDarkmode,
    onModal,
    useUISelector,
} from "@contexts/uiSlice";
import { useUserSelector } from "@contexts/userSlice";
import {
    type FC,
    type ReactNode,
    useCallback,
    useEffect,
    useState,
} from "react";
import styled, { ThemeProvider } from "styled-components";

interface LayoutProps {
    children?: ReactNode | string | any;
    title: string;
}

const USER = {
    username: "익명",
    points: 10,
};

const LOGS = [
    { createdAt: Date.now() - 2000, comment: "최초 로그인", amount: 10 },
    { createdAt: Date.now() - 20000, comment: "자소서 첨삭 봇", amount: -1 },
    { createdAt: Date.now() - 200000, comment: "면접 코칭 봇", amount: -1 },
    { createdAt: Date.now() - 2000000, comment: "면접 코칭 봇", amount: -1 },
    { createdAt: Date.now() - 3500000, comment: "면접 코칭 봇", amount: -1 },
];

const Logo = styled.h3`
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
    min-height: 8vh;
    border-bottom: ${(p) => p.theme.border.active};
    backdrop-filter: blur(1px);
    box-shadow: ${(p) => p.theme.boxShadow.strong};
`;

const Main = styled.main`
    padding-top: 12vh; // 8 + 4
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    min-height: 92vh;
    overflow-x: auto;
    background-color: ${(props) => props.theme.color.backgroundColor};
    color: ${(props) => props.theme.color.textColor};
    transition: ${(props) => props.theme.transition.fast};
    filter: ${(props) => props.theme.filter.blur};
`;

const Footer = styled.footer`
    margin: 12rem auto;
    margin-bottom: 6rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    background-color: ${(props) => props.theme.color.backgroundColor};
    color: ${(props) => props.theme.color.textColor};
    transition: ${(props) => props.theme.transition.fast};
    filter: ${(props) => props.theme.filter.blur};
    /* border-top: ${(p) => p.theme.border.active}; */
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
    const { isLoggedIn } = useUserSelector((state) => state.user);

    const [toast, setToast] = useState(false);

    const toggleThemeMode = useCallback(() => {
        dispatch(isDarkmode ? offDarkmode() : onDarkmode());
    }, [isDarkmode]);

    const memorizedOnModal = useCallback(() => {
        dispatch(onModal());
    }, []);
    const memorizedOffModal = useCallback(() => {
        dispatch(offModal());
    }, []);

    // 페이지 이동 시, 모달은 OFF 상태에서 시작
    useEffect(() => {
        memorizedOffModal();
    }, []);

    return (
        <>
            <Head>
                <title>{`${title} - Know How`}</title>
            </Head>

            <ThemeProvider theme={isDarkmode ? darkTheme : lightTheme}>
                <Header>
                    <Logo>Know How</Logo>
                    <Nav>
                        <UList>
                            <ListItem>
                                <CircleButton
                                    data-testid={"theme toggle button"}
                                    onClick={toggleThemeMode}
                                >
                                    {isDarkmode ? <MoonIcon /> : <SunIcon />}
                                </CircleButton>
                            </ListItem>

                            <ListItem>
                                <CircleButton
                                    data-testid={"sign button"}
                                    onClick={memorizedOnModal}
                                >
                                    <UserIcon />
                                </CircleButton>
                            </ListItem>
                        </UList>
                    </Nav>
                </Header>

                <Main>
                    {children}

                    {showModal ? (
                        isLoggedIn ? (
                            <ProfileModal
                                handleLogout={() => {
                                    setToast(true);
                                }}
                                handleClose={memorizedOffModal}
                                logs={LOGS}
                                point={USER.points}
                                username={USER.username}
                            />
                        ) : (
                            <AuthModal
                                handleClose={memorizedOffModal}
                                onError={() => {}}
                                onSuccess={() => {
                                    setToast(true);
                                }}
                            />
                        )
                    ) : null}

                    {toast ? (
                        <Toast
                            isShow={toast}
                            duration={3000}
                            handleClose={() => {
                                setToast(false);
                                // memorizedOffModal();
                                // {n}초 뒤에 자동으로 로그아웃 됩니다. ?
                            }}
                        >
                            {isLoggedIn ? "로그아웃 성공!" : "로그인 성공!"}
                        </Toast>
                    ) : null}

                    <Footer>
                        <Copyright>{`Copyright 2023. Know How. All rights reserved.`}</Copyright>
                    </Footer>
                </Main>
            </ThemeProvider>
        </>
    );
};

Layout.displayName = "Layout";

export default Layout;
