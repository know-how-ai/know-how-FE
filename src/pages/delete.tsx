import { LabelWrapper } from "@components/molecules";
import Layout from "../layout/Layout";
import { Button, Form, Heading, Input } from "@components/atoms";
import type { NextPage } from "next";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import styled from "styled-components";
import useFetch from "@libs/useFetch";
import { useAppDispatch } from "@contexts/contextHooks";
import { setToast } from "@contexts/uiSlice";
import { loggedOut } from "@contexts/userSlice";
import { URLs } from "@libs/urls";

interface IDeleteForm {
    email: string;
    password: string;
}

const Paragraph = styled.p`
    margin: auto;
    line-height: 2rem;
    font-size: 1.2rem;
    color: ${(p) => p.theme.color.gray};
`;

interface ResponseReturn {
    status: boolean;
    error?: string;
}

const title = "서비스 탈퇴";

const Delete: NextPage = () => {
    const dispatch = useAppDispatch();

    const { replace } = useRouter();
    const { register, handleSubmit } = useForm<IDeleteForm>({
        mode: "onBlur",
    });

    const onSubmit = async (formData: IDeleteForm) => {
        try {
            const { status, error } = await useFetch<
                IDeleteForm,
                ResponseReturn
            >(URLs.USER.DELETE, "POST", formData);

            if (status && !error) {
                replace("/");
                dispatch(loggedOut());
                dispatch(
                    setToast({
                        toast: "이용해주셔서 감사합니다.",
                    })
                );
            } else if (error) {
                dispatch(setToast({ toast: error }));
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Layout title={title} widgets={{ theme: true, profile: true }}>
            <Heading>{title}</Heading>

            <section style={{ margin: "1rem auto" }}>
                <Paragraph>탈퇴 후, 데이터는 복구할 수 없습니다.</Paragraph>
                <Paragraph>
                    정말 탈퇴하시려면 이메일과 패스워드를 입력해주세요.
                </Paragraph>
            </section>

            <Form
                onSubmit={handleSubmit(onSubmit)}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                gap={2}
            >
                <LabelWrapper label="이메일">
                    <Input
                        required
                        type="email"
                        placeholder="id@example.com"
                        register={register("email", {
                            required: true,
                        })}
                    />
                </LabelWrapper>

                <LabelWrapper label="패스워드">
                    <Input
                        required
                        type="password"
                        placeholder="****"
                        register={register("password", {
                            required: true,
                        })}
                    />
                </LabelWrapper>

                <Button type="submit">탈퇴하기</Button>
            </Form>
        </Layout>
    );
};

Delete.displayName = "Interview";

export default Delete;
