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

interface InterviewFormInterface {
    job: string;
    domain: string;
    project: string;
    skill: string;
    feature: string;
    description: string;
}

const ToolTipContents: string[] = [
    "How to use?",
    "원하는 직업과 업계를 입력하고, 수행한 업무나\n프로젝트의 내용과 특징, 사용한 기술 등을 입력해보세요.",
    "인공지능이 분석을 통해 면접에서 받을 수 있는 질문을 나열해드릴게요.\n이를 통해 면접 합격의 성공률을 높여보세요.",
    "입력한 내용은 분석을 위해서만 사용되며, 저장되지 않아요.",
];

const InterviewTitle: string = "면접 도우미 봇";

const interview: NextPage = () => {
    const { register, handleSubmit } = useForm<InterviewFormInterface>({
        mode: "onBlur",
    });

    const onSubmit = (data: InterviewFormInterface) => {
        console.log(data);
    };

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

                <LabelWrapper label="사용한 기술">
                    <Input
                        placeholder="Ex. 드레이핑, 패턴 제도 ..."
                        type="text"
                        register={register("skill", {
                            required: true,
                        })}
                    />
                </LabelWrapper>

                <LabelWrapper label="성과">
                    <Input
                        placeholder="Ex. 브랜드 고객 확보 ..."
                        type="text"
                        register={register("feature", {
                            required: true,
                        })}
                    />
                </LabelWrapper>

                <LabelWrapper label="간략한 설명">
                    <Textarea
                        placeholder="Ex. 이 프로젝트에서 저는 ..."
                        register={register("description", {
                            required: true,
                        })}
                    />
                </LabelWrapper>

                <Button type="submit">제출하기</Button>
            </Form>
        </Layout>
    );
};

interview.displayName = "Interview";

export default interview;
