import Head from "next/head";
import { Anchor, Logo } from "@components/atoms";
import { HeaderWidgets } from "@components/organics";
import { darkTheme, lightTheme } from "@components/styles/theme";
import { useAppDispatch } from "@contexts/contextHooks";
import {
    offDarkmode,
    offModal,
    onDarkmode,
    onModal,
    setToast,
    unsetToast,
    useUISelector,
} from "@contexts/uiSlice";
import { loggedOut, useUserSelector } from "@contexts/userSlice";
import { type FC, useCallback, useEffect, type ReactNode } from "react";
import styled, { ThemeProvider } from "styled-components";
import useFetch from "@libs/useFetch";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { URLs } from "@libs/urls";

const AuthModal = dynamic(() => import("../components/organics/authModal"));
const ProfileModal = dynamic(
    () => import("../components/organics/profileModal")
);
const Toast = dynamic(() => import("../components/atoms/toast"));

interface LayoutProps {
    children?: ReactNode | string | any;
    title: string;
    widgets?: {
        theme?: boolean;
        profile?: boolean;
    };
}

const Header = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 7.5rem;
    background-color: ${(p) => p.theme.color.backgroundColor + "aa"};
    color: ${(p) => p.theme.color.textColor};
    transition: ${(p) => p.theme.transition.fast};
    z-index: 10;
    border-bottom: ${(p) => p.theme.border.active};
    backdrop-filter: blur(1px);
    box-shadow: ${(p) => p.theme.boxShadow.strong};
`;

const Main = styled.main`
    padding-top: 10rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    min-height: calc(100vh - 10rem);
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
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    background-color: ${(props) => props.theme.color.backgroundColor};
    color: ${(props) => props.theme.color.textColor};
    transition: ${(props) => props.theme.transition.fast};
    filter: ${(props) => props.theme.filter.blur};
    overflow: hidden;
`;

const Copyright = styled.span`
    font-style: italic;
    padding: 0.5rem;
    margin: 0.5rem;
    font-size: 1rem;
    color: ${(p) => p.theme.color.gray};
`;

const Layout: FC<LayoutProps> = ({ children, title, widgets }) => {
    const { push } = useRouter();
    const dispatch = useAppDispatch();
    const { isDarkmode, showModal, toast } = useUISelector(({ ui }) => ui);
    const { isLoggedIn, data } = useUserSelector(({ user }) => user);

    const toggleThemeMode = useCallback(() => {
        dispatch(isDarkmode ? offDarkmode() : onDarkmode());
    }, [isDarkmode]);

    const memorizedOnModal = useCallback(() => {
        dispatch(onModal());
    }, []);
    const memorizedOffModal = useCallback(() => {
        dispatch(offModal());
    }, []);
    const memorizedLoggedOut = useCallback(() => {
        dispatch(loggedOut());
    }, []);

    const handleLoggedOut = useCallback(() => {
        useFetch<any, { status: boolean }>(URLs.USER.LOGOUT, "POST").then(
            (response) => {
                if (response.status) {
                    memorizedLoggedOut();

                    dispatch(
                        setToast({
                            toast: "안전하게 로그아웃 되었습니다.",
                        })
                    );

                    memorizedOffModal();
                }
            }
        );
    }, []);

    const onError = useCallback((error: string) => {
        dispatch(setToast({ toast: error }));
    }, []);

    const onSuccessFound = (email: string, resetQuestion: string) => {
        push(`/reset?email=${email}&resetQuestion=${resetQuestion}`);
    };

    // 페이지 이동 시, 모달은 OFF 상태에서 시작
    useEffect(() => {
        if (showModal) {
            memorizedOffModal();
        }
    }, []);

    useEffect(() => {
        if (toast === "로그인이 필요합니다.") {
            memorizedOffModal();
            memorizedLoggedOut();
        }
    }, [toast]);

    return (
        <>
            <Head>
                <title>{`${title} - urworkhelper`}</title>
            </Head>

            <ThemeProvider theme={isDarkmode ? darkTheme : lightTheme}>
                <Header>
                    <Logo href="/">urworkhelper</Logo>
                    <HeaderWidgets
                        isDarkmode={isDarkmode}
                        onModal={memorizedOnModal}
                        toggleThemeMode={toggleThemeMode}
                        profileWidget={widgets?.profile}
                        themeWidget={widgets?.theme}
                    />
                </Header>

                <Main>
                    {children}

                    {showModal ? (
                        isLoggedIn ? (
                            <ProfileModal
                                handleLogout={handleLoggedOut}
                                handleClose={memorizedOffModal}
                                point={data?.point}
                                username={data?.username}
                            />
                        ) : (
                            <AuthModal
                                handleClose={memorizedOffModal}
                                onError={onError}
                                onSuccessJoin={memorizedOffModal}
                                onSuccessFound={onSuccessFound}
                            />
                        )
                    ) : null}

                    {toast ? (
                        <Toast
                            isShow={!!toast}
                            duration={3000}
                            handleClose={() => {
                                dispatch(unsetToast());
                            }}
                        >
                            {toast}
                        </Toast>
                    ) : null}

                    <Footer>
                        <Copyright>{`Copyright 2023. Know How. All rights reserved.`}</Copyright>
                        <Anchor
                            href={`mailto:${process.env.NEXT_PUBLIC_CONTACT}`}
                        >
                            <Copyright>
                                Do you wanna mail to developer? :D
                            </Copyright>
                        </Anchor>
                    </Footer>
                </Main>
            </ThemeProvider>
        </>
    );
};

Layout.displayName = "Layout";

export default Layout;
