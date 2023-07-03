import { decrease, increase } from "../contexts/counterSlice";
import {
    onDarkmode,
    offDarkmode,
    useUISelector,
    offModal,
    onModal,
} from "../contexts/uiSlice";
import { wrapper } from "../contexts/store";
import { useAppDispatch, useAppSelector } from "../contexts/contextHooks";
import type { GetServerSideProps, NextPage } from "next";
import styled from "styled-components";
import { type FormEvent, useState } from "react";
import Layout from "../layout";
import { Button, Modal, Badge, Anchor } from "@components/atoms";
import dynamic from "next/dynamic";
import SelectWithLabel from "@components/molecules/selectWithLabel/SelectWithLabel";
import TextboxWithLabel from "@components/molecules/textboxWithLabel/TextboxWithLabel";

const Toast = dynamic(() => import("@components/atoms/toast/Toast"), {
    ssr: false,
});

const Container = styled.div`
    display: flex;
    justify-content: center;
    padding: 4rem center;
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
    const { isDarkmode, showModal } = useUISelector((state) => state.ui);

    const options = ["Chocolate", "Strawberry", "Banana"];
    const [selectVal, setSelectVal] = useState(options[0]);
    const [inputVal, setInputVal] = useState("");
    const [act, setAct] = useState(false);
    const [isShow, setIsShow] = useState(false);

    return (
        <Layout title="테스트">
            <Container>
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
            </Container>
            <Container>
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
            </Container>
            <Container>
                <Button
                    aria-label="Show Modal"
                    onClick={() => dispatch(onModal())}
                >
                    모달 열기
                </Button>
            </Container>

            <NumSpan>
                다크 모드가 {isDarkmode ? "켜졌어요!" : "꺼졌어요!"}
            </NumSpan>

            <Container>
                <TextboxWithLabel
                    label="아이스크림 이름"
                    currentValue={inputVal}
                    onChange={(e) => {
                        setInputVal(e.currentTarget.value);
                    }}
                />
            </Container>

            <Container>
                <Button>
                    <Anchor href={"/"}>홈으로 가기</Anchor>
                </Button>

                <Badge
                    active={act}
                    onClick={() => {
                        setAct((prev) => !prev);
                    }}
                >
                    반가워요
                </Badge>

                <Button onClick={() => setIsShow(true)}>토스트 굽기</Button>
            </Container>

            {isShow ? (
                <Toast
                    duration={3900}
                    isShow={isShow}
                    handleClose={() => setIsShow(false)}
                >
                    토스트
                </Toast>
            ) : null}

            {showModal ? (
                <Modal
                    handleClose={() => {
                        dispatch(offModal());
                    }}
                >
                    <form
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "2rem",
                            alignItems: "start",
                            justifyContent: "center",
                        }}
                        onSubmit={(e: FormEvent) => {
                            e.preventDefault();
                            console.log(inputVal, selectVal);
                            setInputVal("");
                            setSelectVal(options[0]);
                        }}
                    >
                        <TextboxWithLabel
                            label="아이스크림 이름"
                            currentValue={inputVal}
                            onChange={(e) => {
                                setInputVal(e.currentTarget.value);
                            }}
                        />

                        <SelectWithLabel
                            label="아이스크림 맛"
                            selectedValue={selectVal}
                            onChange={(e) => {
                                setSelectVal(e.target.value);
                            }}
                            options={options}
                        />

                        <Button type="submit">확인</Button>
                    </form>
                    <Button onClick={() => setIsShow(true)}>토스트 굽기</Button>
                    <Button
                        aria-label="Decrement value"
                        onClick={() => dispatch(offModal())}
                    >
                        모달 닫기
                    </Button>
                </Modal>
            ) : null}
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
