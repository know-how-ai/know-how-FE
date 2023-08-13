import { LabelWrapper } from "@components/molecules";
import Layout from "../layout/Layout";
import { Button, Form, Input, Textarea, ToolTip } from "@components/atoms";
import type { NextPage } from "next";
import { useForm } from "react-hook-form";

interface InterviewFormInterface {
    job: string;
    coverletter: string;
}

const ToolTipContents: string[] = [
    "How to use?",
    " 갖고 싶은 직업과 자기소개서를 입력해보세요.\n인공지능이 자기소개서를 분석해서\n잘한 점과 아쉬운 점을 첨삭해드릴게요.",
    "입력한 내용은 분석을 위해서만 사용되며, 저장되지 않아요.",
];

const Interview: NextPage = () => {
    const { register, handleSubmit } = useForm<InterviewFormInterface>({
        mode: "onBlur",
    });

    const onSubmit = (data: InterviewFormInterface) => {
        console.log(data);
    };

    return (
        <Layout title="면접 도우미 봇">
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
                <LabelWrapper label="자기소개서">
                    <Textarea
                        placeholder="Ex. 저는 ..."
                        register={register("coverletter", {
                            required: true,
                        })}
                    />
                </LabelWrapper>

                <ToolTip contents={ToolTipContents} />

                <Button type="submit">제출하기</Button>
            </Form>
        </Layout>
    );
};

Interview.displayName = "Interview";

export default Interview;
