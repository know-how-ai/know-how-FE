import { decrease, increase } from "@/contexts/counterSlice";
import { onDarkmode, offDarkmode, useUISelector } from "@/contexts/uiSlice";
import { wrapper } from "@/contexts/store";
import { useAppDispatch, useAppSelector } from "@/contexts/contextHooks";
import type { GetServerSideProps, NextPage } from "next";
import styled from "styled-components";
import Layout from "@/components/layout/layout";
import Button from "@/components/atom/Button/Button";
import Input from "@/components/atom/Input/Input";

const Container = styled.div`
    display: flex;
    justify-content: center;
    padding: 4rem center;
    flex-direction: column;
    gap: 1.5rem;
`;

const NumSpan = styled.span`
    display: inline-block;
    padding: 1rem;
    text-align: center;
    font-size: 2rem;
`;

interface Props {
    // value: number;
}

const Example: NextPage<Props> = (props) => {
    const dispatch = useAppDispatch();
    const { value } = useAppSelector((state) => state.counter);
    const { isDarkmode } = useUISelector((state) => state.ui);

    return (
        <Layout title="테스트">
            <Container data-testid="test-container">
                <Button
                    aria-label="Increment value"
                    onClick={() => dispatch(increase())}
                >
                    Increment
                </Button>
                <NumSpan>{value}</NumSpan>
                <Button
                    aria-label="Decrement value"
                    onClick={() => dispatch(decrease())}
                >
                    Decrement
                </Button>

                <Button
                    aria-label="Show Modal"
                    onClick={() => dispatch(onDarkmode())}
                >
                    Turn on Dark
                </Button>
                <Button
                    aria-label="Decrement value"
                    onClick={() => dispatch(offDarkmode())}
                >
                    Turn off Dark
                </Button>

                <NumSpan>
                    다크 모드가 {isDarkmode ? "켜졌어요!" : "꺼졌어요!"}
                </NumSpan>

                <div>
                    <div>
                        <Input type="text" />
                    </div>
                    <div>
                        <Input type="checkbox" />
                    </div>
                    <div>
                        <Input type="number" />
                    </div>
                </div>
            </Container>
        </Layout>
    );
};

Example.displayName = "Example";

export const getServerSideProps: GetServerSideProps =
    wrapper.getServerSideProps((store) => async () => {
        store.dispatch(increase());
        store.dispatch(increase());
        store.dispatch(increase());

        // store.dispatch(onModal()); // 호출시 에러. arguments 문제?

        // props에 초기값으로 넘겨줄 수 있지만, 변하는 값이 아니라서 갱신하지 않으면 불변.
        // 컴포넌트 내에서 useAppSelector를 통해서 사용하는 것이 좋음.
        // const {
        //     counter: { value },
        // } = store.getState();

        return {
            props: {
                // value,
            },
        };
    });

export default Example;
