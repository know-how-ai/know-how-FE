import { LabelWrapper } from "@components/molecules";
import Layout from "../../layout/Layout";
import {
    Button,
    Form,
    Heading,
    Input,
    Textarea,
    ToolTip,
} from "@components/atoms";
import type { NextPage } from "next";
import { useForm } from "react-hook-form";
import useFetch from "@libs/useFetch";
import { useAppDispatch } from "@contexts/contextHooks";
import { setToast } from "@contexts/uiSlice";
import {
    setInit,
    setLoading,
    setRequest,
    setResponse,
    unsetLoading,
    useResultSelector,
} from "@contexts/resultSlice";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface ICoverletterForm {
    job: string;
    coverletter: string;
}

interface ResponseReturn {
    status: boolean;
    error?: string;
    data?: {
        result: {
            good: string[];
            bad: string[];
            overall: string[];
        };
    };
}

const ToolTipContents: string[] = [
    "How to use?",
    "되고 싶은 직업과 자기소개서를 입력해보세요.",
    "인공지능이 자기소개서를 분석해서 잘한 점과 아쉬운 점을 첨삭해드릴게요.\n이를 통해 자기소개서의 완성도를 높여 보세요.",
    "입력한 내용은 분석을 위해서만 사용되며, 저장되지 않아요.\n서비스 이용시 1 point가 차감됩니다. ",
];

const CoverletterTitle: string = "자소서 코칭 봇";
const COVERLETTER_URL = `/gpt/coverletter`;

const Coverletter: NextPage = () => {
    const { push } = useRouter();
    const dispatch = useAppDispatch();
    const { register, handleSubmit } = useForm<ICoverletterForm>({
        mode: "onBlur",
    });

    const { isLoading } = useResultSelector(({ result }) => result);

    const onSubmit = async (formData: ICoverletterForm) => {
        try {
            dispatch(setLoading());
            dispatch(
                setToast({
                    toast: "인공지능이 결과를 분석하고 있어요.\n잠시만 기다려주세요.",
                })
            );

            const { error, data } = await useFetch<
                ICoverletterForm,
                ResponseReturn
            >(COVERLETTER_URL, "POST", formData);

            if (data && !error) {
                dispatch(setResponse({ response: data?.result }));
                dispatch(setRequest({ request: formData }));
                dispatch(unsetLoading());
                push("/coverletter/result");
            } else if (error) {
                dispatch(setToast({ toast: error }));
                dispatch(unsetLoading());
            }
        } catch (err) {
            console.error(err);
            dispatch(unsetLoading());
        }
    };

    useEffect(() => {
        dispatch(setInit());
    }, []);

    return (
        <Layout
            title={CoverletterTitle}
            widgets={{ profile: true, theme: true }}
        >
            <Heading>{CoverletterTitle}</Heading>

            <ToolTip contents={ToolTipContents} />

            <Form
                onSubmit={handleSubmit(onSubmit)}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                gap={2}
            >
                <LabelWrapper label="직업">
                    <Input
                        required
                        placeholder="Ex. 건축가, 엔지니어, 디자이너, ..."
                        type="text"
                        register={register("job", {
                            required: true,
                        })}
                    />
                </LabelWrapper>
                <LabelWrapper label="자기소개서">
                    <Textarea
                        required
                        placeholder="Ex. 저는 ..."
                        register={register("coverletter", {
                            required: true,
                        })}
                    />
                </LabelWrapper>

                <Button isLoading={isLoading} type="submit">
                    제출하기
                </Button>
            </Form>
        </Layout>
    );
};

Coverletter.displayName = "Coverletter";

export default Coverletter;
