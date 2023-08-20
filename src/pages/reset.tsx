import { LabelWrapper } from "@components/molecules";
import Layout from "../layout/Layout";
import { Button, Form, Heading, Input } from "@components/atoms";
import type { NextPage } from "next";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface ResetFormInterface {
    email: string;
    resetQuestion: string;
    resetAnswer: string;
    newPassword: string;
    newPasswordConfirmation: string;
}

const Reset: NextPage = () => {
    const { replace } = useRouter();
    const {
        query: { email, resetQuestion },
    } = useRouter();
    const { register, handleSubmit, setError, setValue } =
        useForm<ResetFormInterface>({
            mode: "onBlur",
        });

    const onSubmit = (formData: ResetFormInterface) => {
        console.log(formData);
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
