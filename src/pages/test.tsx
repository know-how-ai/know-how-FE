import { testAction } from "@/contexts/testCtx";
import { useDispatch } from "react-redux";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4rem center;
`;

const Btn = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
`;

const Test = () => {
    const dispatch = useDispatch();
    const onDispatch = () => dispatch(testAction("리덕스 테스트 액션!!"));

    return (
        <Container>
            <Btn type="button" onClick={onDispatch}>
                버튼
            </Btn>
        </Container>
    );
};

export default Test;
