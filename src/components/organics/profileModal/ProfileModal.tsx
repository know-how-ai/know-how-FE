import { Button, Modal } from "@components/atoms";
import { LogTable } from "@components/molecules";
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

const Colored = styled.span`
    font-weight: 600;
    /* color: ${(p) => p.theme.color.blue}; */
`;

interface LogInterface {
    createdAt: number;
    comment: string;
    amount: number;
}

interface ProfileModalInterface {
    handleClose: Function;
    handleLogout: Function;
    username?: string;
    point?: number | string;
    logs?: LogInterface[];
}

const greeting = <span>님 반가워요!</span>;
const restPoint = <span>잔여 포인트 :</span>;

const ProfileModal = ({
    handleClose,
    point,
    username,
    logs,
    handleLogout,
}: ProfileModalInterface) => {
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

                <LogTable logs={logs} />
                <Button onClick={handleLogout}>로그아웃</Button>
            </Container>
        </Modal>
    );
};

export default ProfileModal;
