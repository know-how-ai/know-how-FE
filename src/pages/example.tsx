import { decrease, increase } from "@/contexts/counterSlice";
import { reDecrease, reIncrease } from "@/contexts/reverseSlice";
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
    const { value: count } = useAppSelector((state) => state.counter);
    const { num } = useAppSelector((state) => state.reverse);

    return (
        <Container data-testid="test-container">
            <Btn
                aria-label="Increment value"
                onClick={() => dispatch(increase())}
            >
                Increment
            </Btn>
            <NumSpan>{count}</NumSpan>
            <Btn
                aria-label="Decrement value"
                onClick={() => dispatch(decrease())}
            >
                Decrement
            </Btn>
            <Btn
                aria-label="Increment value"
                onClick={() => dispatch(reIncrease())}
            >
                Increment
            </Btn>
            <NumSpan>{num}</NumSpan>
            <Btn
                aria-label="Decrement value"
                onClick={() => dispatch(reDecrease())}
            >
                Decrement
            </Btn>
        </Container>
    );
};

Example.displayName = "Example";

export const getServerSideProps: GetServerSideProps =
    wrapper.getServerSideProps((store) => async () => {
        store.dispatch(increase());
        store.dispatch(increase());
        store.dispatch(increase());

        store.dispatch(reIncrease());

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
