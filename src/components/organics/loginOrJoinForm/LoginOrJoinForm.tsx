import { Button, Form } from "@components/atoms";
import { TextboxWithLabel, ToggleButton } from "@components/molecules";
import { useState } from "react";
import styled from "styled-components";

type Method = "LOGIN" | "JOIN";
interface HeadLineSpanProps {
    isSelected?: boolean;
}

const FormContainer = styled.section`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const HeadLine = styled.h3`
    width: 85%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const HeadLineSpan = styled.span<HeadLineSpanProps>`
    display: inline-block;
    font-weight: 600;
    font-size: ${(p) => p.theme.size.lg};
    text-align: center;
    color: ${(p) =>
        p.isSelected ? p.theme.color.textColor : p.theme.color.gray};
    animation: ${(p) => (p.isSelected ? "activate" : "deactivate")} 1s 1
        forwards ease-in-out;

    @keyframes deactivate {
        from {
            color: ${(p) => p.theme.color.textColor};
        }
        to {
            color: ${(p) => p.theme.color.gray};
        }
    }

    @keyframes activate {
        from {
            color: ${(p) => p.theme.color.gray};
        }
        to {
            color: ${(p) => p.theme.color.textColor};
        }
    }
`;

const LoginOrJoinForm = () => {
    const [method, setMethod] = useState<Method>("LOGIN");

    return (
        <FormContainer>
            <HeadLine>
                <HeadLineSpan isSelected={method === "LOGIN"}>
                    접속하기
                </HeadLineSpan>
                <ToggleButton
                    variant="dual"
                    scale={0.35}
                    statement={method === "LOGIN"}
                    onClick={() => {
                        setMethod(method === "LOGIN" ? "JOIN" : "LOGIN");
                    }}
                    ariaLabel={"Login or Join toggle Button"}
                    ariaDescription={`Current method is ${method}.`}
                />
                <HeadLineSpan isSelected={method === "JOIN"}>
                    가입하기
                </HeadLineSpan>
            </HeadLine>

            <Form>
                <TextboxWithLabel
                    type="email"
                    placeholder="이메일"
                    label="이메일"
                />
                <TextboxWithLabel
                    type="password"
                    placeholder="패스워드"
                    label="패스워드"
                />

                {method === "JOIN" ? (
                    <TextboxWithLabel
                        type="password"
                        placeholder="패스워드 확인"
                        label="패스워드 확인"
                    />
                ) : null}

                <Button ariaLabel="submit form for login" type="submit">
                    접속하기
                </Button>
            </Form>
        </FormContainer>
    );
};

export default LoginOrJoinForm;
