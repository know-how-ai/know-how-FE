import { decrease, increase } from "@/contexts/counterSlice";
import { onModal, offModal } from "@/contexts/uiSlice";
import { wrapper } from "@/contexts/store";
import { useAppDispatch, useAppSelector } from "@/libs/contextHooks";
import type { GetServerSideProps, NextPage } from "next";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4rem center;
    flex-direction: column;
`;

const NumSpan = styled.span`
    display: inline-block;
    padding: 1rem;
    text-align: center;
    font-size: 2rem;
`;

const Btn = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    color: white;
    background-color: black;
    :hover {
        color: lime;
        transition: all 0.3s ease-in-out;
    }
`;

interface Props {
    value: number;
}

const Example: NextPage<Props> = (props) => {
    const dispatch = useAppDispatch();
    const { value } = useAppSelector((state) => state.counter);
    const { showModal } = useAppSelector((state) => state.ui);

    return (
        <Container data-testid="test-container">
            <div>
                <Btn
                    aria-label="Increment value"
                    onClick={() => dispatch(increase())}
                >
                    Increment
                </Btn>
                <NumSpan>{value}</NumSpan>
                <Btn
                    aria-label="Decrement value"
                    onClick={() => dispatch(decrease())}
                >
                    Decrement
                </Btn>
            </div>
            <div>
                <Btn
                    aria-label="Show Modal"
                    onClick={() => dispatch(onModal())}
                >
                    Turn on Modal
                </Btn>
                <Btn
                    aria-label="Decrement value"
                    onClick={() => dispatch(offModal())}
                >
                    Turn off Modal
                </Btn>
            </div>
            {showModal ? <NumSpan>모달이 켜졌어요!</NumSpan> : null}
        </Container>
    );
};

Example.displayName = "Example";

export const getServerSideProps: GetServerSideProps =
    wrapper.getServerSideProps((store) => async () => {
        store.dispatch(increase());
        store.dispatch(increase());
        store.dispatch(increase());

        store.dispatch(onModal());

        // props에 초기값으로 넘겨줄 수 있지만, 변하는 값이 아니라서 갱신하지 않으면 불변.
        // 컴포넌트 내에서 useAppSelector를 통해서 사용하는 것이 좋음.
        const {
            counter: { value },
        } = store.getState();

        return {
            props: {
                value,
            },
        };
    });

export default Example;
