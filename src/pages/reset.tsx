import { LabelWrapper } from "@components/molecules";
import Layout from "../layout/Layout";
import { Button, Form, Heading, Input } from "@components/atoms";
import type { NextPage } from "next";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useFetch from "@libs/useFetch";
import { useAppDispatch } from "@contexts/contextHooks";
import { setToast } from "@contexts/uiSlice";

interface IResetForm {
    email: string;
    resetQuestion: string;
    resetAnswer: string;
    newPassword: string;
    newPasswordConfirmation: string;
}

interface ResponseReturn {
    status: boolean;
    error?: string;
}

const RESET_URL = `/user/reset`;

const Reset: NextPage = () => {
    const {
        query: { email, resetQuestion },
        replace,
    } = useRouter();
    const { register, handleSubmit, setValue } = useForm<IResetForm>({
        mode: "onBlur",
    });
    const dispatch = useAppDispatch();

    const onSubmit = async (formData: IResetForm) => {
        try {
            const { status, error } = await useFetch<
                IResetForm,
                ResponseReturn
            >(RESET_URL, "PUT", formData);

            if (status) {
                replace("/");
                dispatch(setToast({ toast: "성공적으로 변경되었습니다." }));
            } else if (error) {
                dispatch(setToast({ toast: error }));
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (typeof email === "string" && typeof resetQuestion === "string") {
            setValue("email", email);
            setValue("resetQuestion", resetQuestion);
        }
    }, [email, resetQuestion]);

    return (
        <Layout title={"패스워드 초기화"} widgets={{ theme: true }}>
            <Heading>패스워드 초기화</Heading>

            <Form
                onSubmit={handleSubmit(onSubmit)}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                gap={2}
            >
                <LabelWrapper label="이메일">
                    <Input
                        disabled
                        type="email"
                        register={register("email", {
                            required: true,
                        })}
                    />
                </LabelWrapper>
                <LabelWrapper label="패스워드 초기화 질문">
                    <Input
                        disabled
                        type="text"
                        register={register("resetQuestion", {
                            required: true,
                        })}
                    />
                </LabelWrapper>

                <LabelWrapper label="패스워드 초기화 답변">
                    <Input
                        type="text"
                        register={register("resetAnswer", {
                            required: true,
                        })}
                    />
                </LabelWrapper>

                <LabelWrapper label="새 패스워드">
                    <Input
                        type="password"
                        register={register("newPassword", {
                            required: true,
                        })}
                    />
                </LabelWrapper>

                <LabelWrapper label="새 패스워드 확인">
                    <Input
                        type="password"
                        register={register("newPasswordConfirmation", {
                            required: true,
                        })}
                    />
                </LabelWrapper>

                <Button type="submit">변경하기</Button>
            </Form>
        </Layout>
    );
};

Reset.displayName = "Interview";

export default Reset;
