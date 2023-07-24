import { Button, Form, Input } from "@components/atoms";
import { LabelWrapper, ToggleButton } from "@components/molecules";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

type Method = "LOGIN" | "JOIN";
interface HeadLineSpanProps {
    isSelected?: boolean;
}

const Container = styled.section`
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

interface LoginFormInterface {
    email: string;
    password: string;
}

interface JoinFormInterface extends LoginFormInterface {
    passwordConfirmation: string;
    username: string;
    blogname: string;
    resetQuestion: string;
    resetAnswer: string;
}

const LoginOrJoinForm = () => {
    const [method, setMethod] = useState<Method>("LOGIN");
    const { register, handleSubmit, setError } = useForm<
        LoginFormInterface | JoinFormInterface
    >({ reValidateMode: "onBlur" });

    const onSubmit = (data?: any) => {
        console.log(data);
    };

    return (
        <Container>
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

            <Form
                ariaLabel={`Form for ${method.toLowerCase()} the website`}
                onSubmit={handleSubmit(onSubmit)}
            >
                <LabelWrapper label="이메일">
                    <Input
                        type="email"
                        placeholder="abcd@blogify.com"
                        ariaLabel={`Email Input element for ${method.toLowerCase()}`}
                        register={register("email", {
                            required: true,
                            pattern: {
                                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                                message: "올바른 이메일 주소를 입력해 주세요.",
                            },
                        })}
                    />
                </LabelWrapper>
                <LabelWrapper label="패스워드">
                    <Input
                        type="password"
                        placeholder="****"
                        ariaLabel={`Password Input element for ${method.toLowerCase}`}
                        register={register("password", {
                            required: true,
                            minLength: {
                                message:
                                    "4~16자 사이의 비밀번호를 입력해주세요.",
                                value: 4,
                            },
                            maxLength: {
                                message:
                                    "4~16자 사이의 비밀번호를 입력해주세요.",
                                value: 16,
                            },
                        })}
                    />
                </LabelWrapper>

                {method === "JOIN" ? (
                    <>
                        <LabelWrapper label="패스워드 확인">
                            <Input
                                type="password"
                                placeholder="****"
                                register={register("passwordConfirmation", {
                                    required: true,
                                    minLength: {
                                        message:
                                            "4~16자 사이의 비밀번호를 입력해주세요.",
                                        value: 4,
                                    },
                                    maxLength: {
                                        message:
                                            "4~16자 사이의 비밀번호를 입력해주세요.",
                                        value: 16,
                                    },
                                    validate: {
                                        accordance: (value, values) =>
                                            values.password === value,
                                    },
                                })}
                            />
                        </LabelWrapper>
                        <LabelWrapper label="닉네임">
                            <Input
                                type="text"
                                placeholder="홍길동"
                                register={register("username", {
                                    required: true,
                                    minLength: {
                                        message: "2~16자 사이로 입력해 주세요.",
                                        value: 2,
                                    },
                                    maxLength: {
                                        message: "2~16자 사이로 입력해 주세요.",
                                        value: 16,
                                    },
                                    pattern: {
                                        value: /^[a-zA-Zㄱ-힣0-9|s]*$/,
                                        message:
                                            "특수문자는 사용할 수 없습니다.",
                                    },
                                })}
                            />
                        </LabelWrapper>
                        <LabelWrapper label="블로그명">
                            <Input
                                type="text"
                                placeholder="홍길동의 블로그"
                                register={register("blogname", {
                                    required: true,
                                    minLength: {
                                        message: "2~16자 사이로 입력해 주세요.",
                                        value: 2,
                                    },
                                    maxLength: {
                                        message: "2~16자 사이로 입력해 주세요.",
                                        value: 16,
                                    },
                                    pattern: {
                                        value: /^[a-zA-Zㄱ-힣0-9|s]*$/,
                                        message:
                                            "특수문자는 사용할 수 없습니다.",
                                    },
                                })}
                            />
                        </LabelWrapper>
                        <LabelWrapper label="패스워드 초기화 질문">
                            <Input
                                type="text"
                                placeholder="패스워드 초기화를 위한 질문을 설정해주세요."
                                register={register("resetQuestion", {
                                    required: true,
                                    minLength: {
                                        message: "2자 이상으로 입력해 주세요.",
                                        value: 2,
                                    },
                                })}
                            />
                        </LabelWrapper>
                        <LabelWrapper label="패스워드 초기화 답변">
                            <Input
                                type="text"
                                placeholder="패스워드 초기화를 위한 질문의 답변을 설정해주세요."
                                register={register("resetAnswer", {
                                    required: true,
                                    minLength: {
                                        message: "2자 이상으로 입력해 주세요.",
                                        value: 2,
                                    },
                                })}
                            />
                        </LabelWrapper>
                    </>
                ) : null}

                <Button ariaLabel="submitting form for login" type="submit">
                    {method === "LOGIN" ? "접속하기" : "가입하기"}
                </Button>
            </Form>
        </Container>
    );
};

export default LoginOrJoinForm;
