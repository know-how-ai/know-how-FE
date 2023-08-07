import { Button, Modal } from "@components/atoms";
import Layout from "../layout/Layout";
import { offModal, onModal, useUISelector } from "@contexts/uiSlice";
import { useAppDispatch } from "@contexts/contextHooks";
import styled from "styled-components";

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

// createdAt | comment | amount

export default function Mockup() {
    const dispatch = useAppDispatch();
    const { showModal } = useUISelector((state) => state.ui);

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

    return (
        <Layout title="Mockup">
            <Button
                onClick={() => {
                    dispatch(onModal());
                }}
            >
                로그 보기
            </Button>

            {showModal ? (
                <Modal
                    handleClose={() => {
                        dispatch(offModal());
                    }}
                >
                    <Container>
                        <Title>
                            <Colored>{USER.username}</Colored>님 반가워요!
                        </Title>
                        <Sub>
                            잔여 포인트 : <Colored>{USER.points}</Colored>
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
                                {LOGS.map((log) => (
                                    <Tr>
                                        <Td>{formatDate(log.createdAt)}</Td>
                                        <Td>{log.comment}</Td>
                                        <Td>{log.amount}</Td>
                                    </Tr>
                                ))}
                            </tbody>
                        </Table>
                        <Button>로그아웃</Button>
                    </Container>
                </Modal>
            ) : null}
        </Layout>
    );
}
