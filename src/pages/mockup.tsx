import { LabelWrapper } from "@components/molecules";
import Layout from "../layout/Layout";
import { KeyboardEvent, useRef, useState } from "react";
import styled from "styled-components";
import { Badge, Button, Input } from "@components/atoms";

const Container = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 2rem;
`;

const FormContainer = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
`;

const BadgeContainer = styled.div`
    margin: auto;
    padding: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    width: 100%;
    max-width: 50vw;
`;

export default function Mockup() {
    const [state, setState] = useState<string[]>([]);

    const inputRef = useRef<HTMLInputElement>(null);

    const onClickAdd = () => {
        console.log("called");
        if (inputRef?.current?.value && inputRef.current.value !== "") {
            setState([...state, inputRef.current.value]);

            // reset field
            inputRef.current.value = "";
        }
    };

    const onClickRemove = (target: number) => {
        setState(state.filter((_, i) => i !== target));
    };

    return (
        <Layout title="Mockup">
            <Container>
                <FormContainer
                    onSubmit={(e) => {
                        e.preventDefault();
                    }}
                >
                    <LabelWrapper label="나의 성향">
                        <Input ref={inputRef} type="text" />
                    </LabelWrapper>
                    <Button onClick={onClickAdd}>추가</Button>
                </FormContainer>
                <BadgeContainer>
                    {state.map((v, i) => (
                        <Badge
                            onClick={() => {
                                onClickRemove(i);
                            }}
                            active={true}
                            key={i}
                        >
                            {v}
                        </Badge>
                    ))}
                </BadgeContainer>
                <Button>추천받기</Button>
            </Container>
        </Layout>
    );
}
