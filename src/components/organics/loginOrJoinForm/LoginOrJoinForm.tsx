import { Button, Form, Input } from "@components/atoms";
import { useState } from "react";
import styled from "styled-components";

type Method = "LOGIN" | "JOIN";

const FormContainer = styled.section``;
const HeadLine = styled.h3``;

const LoginOrJoinForm = () => {
    const [method, setMethod] = useState<Method>("LOGIN");

    return (
        <FormContainer>
            {method === "LOGIN" ? (
                <>
                    <HeadLine>접속하기</HeadLine>
                    <Form>
                        <Input type="email" />
                        <Input type="password" />
                        <Button ariaLabel="submit form for login" type="submit">
                            →
                        </Button>
                    </Form>
                </>
            ) : (
                <>
                    <HeadLine>가입하기</HeadLine>
                    <Form>
                        <Input type="email" />
                        <Input type="password" />
                        <Input type="password" />
                        <Button
                            ariaLabel="submit form for create a new account"
                            type="submit"
                        >
                            →
                        </Button>
                    </Form>
                </>
            )}
        </FormContainer>
    );
};

export default LoginOrJoinForm;
