import {
    Button,
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
import { useUserSelector } from "@contexts/userSlice";
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

const Container = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    padding: 2rem 1rem;
`;

const Title = styled.h3`
    font-size: 2rem;
`;

const Sub = styled.h5`
    font-size: 1.5rem;
`;

const Colored = styled.span`
    font-weight: 600;
    /* color: ${(p) => p.theme.color.blue}; */
`;

const Table = styled.table`
    display: block;
    justify-content: center;
    align-items: center;
`;

const Tr = styled.tr`
    gap: 1rem;
    margin: 0.25rem auto;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
`;

const Th = styled.th`
    border-radius: 1rem;
    padding: 1rem;
    background-color: ${(p) => p.theme.color.lightBlue};
    text-align: center;
    font-weight: 600;
`;

const Td = styled.td`
    padding: 1rem;
    text-align: center;
`;

const formatDate = (date: number) => {
    let diff = Date.now() - date; // 차이(ms)

    if (diff < 1000) {
        // 차이가 1초 미만이라면
        return "현재";
    }

    let sec = Math.floor(diff / 1000); // 차이를 초로 변환

    if (sec < 60) {
        return sec + "초 전";
    }

    let min = Math.floor(diff / 60000); // 차이를 분으로 변환
    if (min < 60) {
        return min + "분 전";
    }

    // 날짜의 포맷을 변경
    // 일, 월, 시, 분이 숫자 하나로 구성되어있는 경우, 앞에 0을 추가해줌
    let d = new Date(date);
    // @ts-ignore
    d = [
        "0" + d.getDate(),
        "0" + (d.getMonth() + 1),
        "" + d.getFullYear(),
        "0" + d.getHours(),
        "0" + d.getMinutes(),
    ].map((component) => component.slice(-2)); // 모든 컴포넌트의 마지막 숫자 2개를 가져옴

    // 컴포넌트를 조합
    // @ts-ignore
    return d.slice(0, 3).join(".") + " " + d.slice(3).join(":");
};

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
    const { isLoggedIn } = useUserSelector((state) => state.user);

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
                        !isLoggedIn ? (
                            <Modal
                                handleClose={() => {
                                    dispatch(offModal());
                                }}
                            >
                                <Container>
                                    <Title>
                                        <Colored>{USER.username}</Colored>님
                                        반가워요!
                                    </Title>
                                    <Sub>
                                        잔여 포인트 :{" "}
                                        <Colored>{USER.points}</Colored>
                                    </Sub>

                                    <Table>
                                        <thead>
                                            <Tr>
                                                <Th>일시</Th>
                                                <Th>내용</Th>
                                                <Th>변화</Th>
                                            </Tr>
                                        </thead>
                                        <tbody>
                                            {LOGS.map((log, idx) => (
                                                <Tr key={idx}>
                                                    <Td>
                                                        {formatDate(
                                                            log.createdAt
                                                        )}
                                                    </Td>
                                                    <Td>{log.comment}</Td>
                                                    <Td>{log.amount}</Td>
                                                </Tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                    <Button>로그아웃</Button>
                                </Container>
                            </Modal>
                        ) : (
                            <Modal handleClose={memorizedOffModal}>
                                <LoginOrJoinForm
                                    onSuccess={() => {
                                        setToast(true);
                                    }}
                                />
                            </Modal>
                        )
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
