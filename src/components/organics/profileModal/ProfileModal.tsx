import { Button, Modal } from "@components/atoms";
import { LogTable } from "@components/molecules";
import { useAppDispatch } from "@contexts/contextHooks";
import { offModal, setToast } from "@contexts/uiSlice";
import { useUserSelector } from "@contexts/userSlice";
import useFetch from "@libs/useFetch";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

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

const Colored = styled.b`
    font-weight: 600;
`;

const Span = styled.span`
    color: ${(p) => p.theme.color.textColor};
`;

interface ILog {
    created_at: number;
    comment: string;
    amount: number;
}

interface ILogResponse {
    status: boolean;
    error?: string;
    data?: {
        logs: ILog[];
    };
}

interface IProfileModal {
    handleClose: Function;
    handleLogout: Function;
    username?: string;
    point?: number | string;
    logs?: ILog[];
}

const greeting = <span>님 반가워요!</span>;
const restPoint = <span>잔여 포인트 : </span>;

const ProfileModal = ({
    handleClose,
    point,
    username,
    handleLogout,
}: IProfileModal) => {
    const dispatch = useAppDispatch();
    const { isLoggedIn } = useUserSelector(({ user }) => user);

    const [logs, setLogs] = useState<ILog[]>([]);
    const [index, setIndex] = useState<number>(0);

    const useGetLogs = useCallback(() => {
        useFetch<any, ILogResponse>(
            `/user/log?skip=${logs.length}`,
            "GET"
        ).then((response) => {
            if (response.data) {
                setLogs([...logs, ...(response?.data?.logs || [])]);
                setIndex(index + 1);
            } else if (response.error) {
                dispatch(setToast({ toast: response.error }));
            }
        });
    }, [index, logs.length]);

    useEffect(() => {
        if (!isLoggedIn) {
            dispatch(setToast({ toast: "로그인이 필요합니다." }));
            dispatch(offModal());
        } else {
            useGetLogs();
        }
    }, []);

    return (
        <Modal handleClose={handleClose}>
            <Container>
                <Title>
                    <Colored>{username}</Colored>
                    {greeting}
                </Title>
                <Sub>
                    {restPoint}
                    <Colored>{point}</Colored>
                </Sub>

                {logs?.length >= 0 ? (
                    <LogTable
                        logs={logs.slice(
                            (index - 1) * 5,
                            Math.min(index * 5, logs.length)
                        )}
                    />
                ) : (
                    <Button color="transparent" isLoading={true} />
                )}

                <nav>
                    <ul
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "2rem",
                        }}
                    >
                        <li>
                            <button
                                onClick={() => {
                                    // NO API CALL
                                    if (index === 1) return;

                                    setIndex(index - 1);
                                }}
                            >
                                <Span>이전</Span>
                            </button>
                        </li>
                        <li>
                            <Span>{index}</Span>
                        </li>
                        <li>
                            <button
                                onClick={() => {
                                    if (
                                        logs.length % 5 === 0 &&
                                        index * 5 === logs.length
                                    ) {
                                        useGetLogs();
                                    } else if (index * 5 < logs.length) {
                                        setIndex(index + 1);
                                    }
                                }}
                            >
                                <Span>다음</Span>
                            </button>
                        </li>
                    </ul>
                </nav>

                <Button onClick={handleLogout}>로그아웃</Button>
                <button onClick={() => {}}>
                    <Span>서비스를 그만 이용하고 싶어요.</Span>
                </button>
            </Container>
        </Modal>
    );
};

export default ProfileModal;
