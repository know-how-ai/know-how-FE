import { CircleButton, LoginIcon, MoonIcon, SunIcon } from "@components/atoms";
import { useAppDispatch } from "@contexts/contextHooks";
import {
    offDarkmode,
    offModal,
    onDarkmode,
    onModal,
    useUISelector,
} from "@contexts/uiSlice";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import dynamic from "next/dynamic";

const Modal = dynamic(import("../../atoms/modal/Modal"), {
    ssr: true,
});
const LoginOrJoinForm = dynamic(import("../loginOrJoinForm/LoginOrJoinForm"), {
    ssr: true,
});
const Toast = dynamic(import("../../atoms/toast/Toast"), {
    ssr: true,
});

const HeaderContainer = styled.header`
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

const Header = () => {
    const dispatch = useAppDispatch();
    const { isDarkmode, showModal } = useUISelector((state) => state.ui);
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

    // 페이지 이동 시, 모달은 OFF 상태에서 시작.
    useEffect(() => {
        memorizedOffModal();
    }, []);

    return (
        <>
            <HeaderContainer>
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
            </HeaderContainer>

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
        </>
    );
};

export default Header;
