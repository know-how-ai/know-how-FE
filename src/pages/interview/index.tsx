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
import useFetchService from "@libs/useFetchService";
import { useEffect } from "react";
import { useAppDispatch } from "@contexts/contextHooks";
import { setInit, useResultSelector } from "@contexts/resultSlice";

interface IInterviewForm {
    job: string;
    domain: string;
    project: string;
    skill: string;
    description: string;
}

interface IResult {
    job: string;
    description: string;
}

type ResultType = IResult[];

const ToolTipContents: string[] = [
    "How to use?",
    "원하는 직업과 업계를 입력하고, 수행한 업무나\n프로젝트의 내용과 특징, 사용한 기술 등을 입력해보세요.",
    "인공지능이 분석을 통해 면접에서 받을 수 있는 질문을 나열해드릴게요.\n이를 통해 면접 합격의 성공률을 높여보세요.",
    "입력한 내용은 분석을 위해서만 사용되며, 저장되지 않아요.\n서비스 이용시 1 point가 차감됩니다. ",
];

const InterviewTitle: string = "면접 코칭 봇";
const INTERVIEW_URL = "/gpt/interview";

const interview: NextPage = () => {
    const dispatch = useAppDispatch();
    const { isLoading } = useResultSelector(({ result }) => result);
    const { register, handleSubmit } = useForm<IInterviewForm>({
        mode: "onBlur",
    });

    const onSubmit = useFetchService<IInterviewForm, ResultType>({
        fetchUrl: INTERVIEW_URL,
        afterFetchUrl: "/interview/result",
        target: "interview",
    });
    useEffect(() => {
        dispatch(setInit({ target: "interview" }));
    }, []);

    return (
        <Layout title={InterviewTitle} widgets={{ profile: true, theme: true }}>
            <Heading>{InterviewTitle}</Heading>

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
                        placeholder="Ex. 건축가, 엔지니어, 디자이너, ..."
                        type="text"
                        register={register("job", {
                            required: true,
                        })}
                    />
                </LabelWrapper>

                <LabelWrapper label="업계">
                    <Input
                        placeholder="Ex. IT, 패션, ..."
                        type="text"
                        register={register("domain", {
                            required: true,
                        })}
                    />
                </LabelWrapper>

                <LabelWrapper label="프로젝트명">
                    <Input
                        placeholder="Ex. FW 패션 컬렉션 진행 ..."
                        type="text"
                        register={register("project", {
                            required: true,
                        })}
                    />
                </LabelWrapper>

                <LabelWrapper label="기술 및 노하우">
                    <Input
                        placeholder="Ex. 드레이핑, 패턴 제도 ..."
                        type="text"
                        register={register("skill", {
                            required: true,
                        })}
                    />
                </LabelWrapper>

                <LabelWrapper label="간단한 설명 및 성과">
                    <Textarea
                        placeholder="프로젝트의 간단한 설명이나 진행하여 얻게 된 성과를 적어주세요. Ex. 이 프로젝트에서 저는 ..."
                        register={register("description", {
                            required: true,
                            maxLength: {
                                value: 300,
                                message: "300자 이내로 적어주세요.",
                            },
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

interview.displayName = "Interview";

export default interview;
