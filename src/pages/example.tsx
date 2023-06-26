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

const Example = () => {
    const dispatch = useDispatch();
    const onDispatch = () => dispatch(testAction("리덕스 테스트 액션!!"));

    return (
        <Container data-testid="test-container">
            <Btn type="button" onClick={onDispatch}>
                버튼
            </Btn>
        </Container>
    );
};

Example.displayName = "Example";

export default Example;
