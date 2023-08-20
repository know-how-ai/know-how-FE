import { Button, Form, Heading, Input, ToggleButton } from "@components/atoms";
import { LabelWrapper } from "@components/molecules";
import { useAppDispatch } from "@contexts/contextHooks";
import { setToast } from "@contexts/uiSlice";
import { loggedIn } from "@contexts/userSlice";
import useFetch from "@libs/useFetch";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

type Method = "LOGIN" | "JOIN";

interface HeadLineProps {
    isSelected?: boolean;
}

const Container = styled.section`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: auto 2rem;
    margin: auto 2rem;
    width: auto;
`;

const TitleContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 2rem auto;
    gap: 1rem;
`;

const HeadLine = styled(Heading)<HeadLineProps>`
    animation: ${(p) => (p.isSelected ? "activate" : "deactivate")} 0.5s
        forwards ease-in-out;
    -webkit-animation: ${(p) => (p.isSelected ? "activate" : "deactivate")} 0.5s
        forwards ease-in-out;

    @keyframes activate {
        from {
            opacity: 0.3;
        }
        to {
            opacity: 1;
        }
    }

    @keyframes deactivate {
        from {
            opacity: 1;
        }
        to {
            opacity: 0.3;
        }
    }
`;

interface ILoginForm {
    email: string;
    password: string;
}

interface IJoinForm extends ILoginForm {
    passwordConfirmation: string;
    username: string;
    resetQuestion: string;
    resetAnswer: string;
}

interface ResponseReturn {
    status: boolean;
    error?: string;
    data?: {
        id: number;
        username: string;
        point: number;
    };
}

interface LoginOrJoinFormProps {
    onSuccess: Function;
    onError: Function;
}

const LoginOrJoinForm = ({ onSuccess, onError }: LoginOrJoinFormProps) => {
    const dispatch = useAppDispatch();
    const [method, setMethod] = useState<Method>("LOGIN");
    const { register, handleSubmit, setError } = useForm<
        ILoginForm | IJoinForm
    >({
        reValidateMode: "onBlur",
    });

    const onSubmit = async (formData: ILoginForm | IJoinForm) => {
        /**
         * 패스워드 && 패스워드 확인란 일치 여부 => validate 옵션이 해결
         * 메서드에 따른 인터페이스 일치 여부 => useForm의 register에서 해결
         */

        const url = method === "LOGIN" ? "/user/in" : "/user/new";

        try {
            const { data, status, error } = await useFetch<
                ILoginForm | IJoinForm,
                ResponseReturn
            >(url, "POST", formData);

            // 로그인(조인) 성공 && 별다른 에러 없음
            if (data && !error) {
                const { id, point, username } = data;

                dispatch(
                    loggedIn({
                        id,
                        point,
                        username,
                    })
                );

                dispatch(setToast({ toast: `${username}님 환영합니다!` }));

                if (onSuccess) {
                    onSuccess();
                }
            }
            // 통신은 성공 && 요청에 오류 존재
            else if (error) {
                dispatch(setToast({ toast: error }));

                if (onError) {
                    onError();
                }
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Container>
            <TitleContainer>
                <HeadLine isSelected={method === "LOGIN"}>접속하기</HeadLine>
                <ToggleButton
                    variant="dual"
                    statement={method === "LOGIN"}
                    onClick={() => {
                        setMethod(method === "LOGIN" ? "JOIN" : "LOGIN");
                    }}
                    ariaLabel={"Login or Join toggle Button"}
                    ariaDescription={`Current method is ${method}.`}
                />
                <HeadLine isSelected={method === "JOIN"}>가입하기</HeadLine>
            </TitleContainer>

            <Form
                display="flex"
                flexDirection="column"
                gap={2}
                // alignItems="center"
                ariaLabel={`Form for ${method.toLowerCase()} the website`}
                onSubmit={handleSubmit(onSubmit)}
            >
                <LabelWrapper label="이메일">
                    <Input
                        required
                        type="email"
                        placeholder="abcd@blogify.com"
                        ariaLabel={`Email Input element for ${method.toLowerCase()}`}
                        autoComplete="on"
                        autoCorrect="off"
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
                        required
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
                                required
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
                                required
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
                        <LabelWrapper label="패스워드 초기화 질문">
                            <Input
                                required
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
                                required
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
