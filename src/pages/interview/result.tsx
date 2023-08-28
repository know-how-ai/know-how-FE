import { LabelWrapper } from "@components/molecules";
import Layout from "../../layout/Layout";
import {
    Form,
    Heading,
    Hr,
    Input,
    Paragraph,
    SubHeading,
    Textarea,
} from "@components/atoms";
import type { NextPage } from "next";
import { useResultSelector } from "@contexts/resultSlice";
import { ResultContainer } from "@components/organics";

const InterviewResultTitle: string = "면접 코칭 결과";

const InterviewResult: NextPage = () => {
    const {
        request: { interview: intvRequest },
        response: { interview: intvResponse },
    } = useResultSelector(({ result }) => result);

    return (
        <Layout
            title={InterviewResultTitle}
            widgets={{ profile: true, theme: true }}
        >
            <Heading>{"면접 코칭 봇"}</Heading>

            <Form
                onSubmit={(e: SubmitEvent) => e.preventDefault()}
                display="flex"
                flexDirection="column"
                alignItems="center"
                gap={2}
            >
                <LabelWrapper label="직업">
                    <Input readOnly value={intvRequest?.job} />
                </LabelWrapper>

                <LabelWrapper label="업계">
                    <Input readOnly value={intvRequest?.domain} />
                </LabelWrapper>

                <LabelWrapper label="프로젝트명">
                    <Input readOnly value={intvRequest?.project} />
                </LabelWrapper>

                <LabelWrapper label="기술 및 노하우">
                    <Input readOnly value={intvRequest?.skill} />
                </LabelWrapper>

                <LabelWrapper label={`간단한 설명 및 성과`}>
                    <Textarea readOnly value={intvRequest?.description} />
                </LabelWrapper>

                <Heading>{InterviewResultTitle}</Heading>

                <ResultContainer>
                    {intvResponse?.map((v: string, i: number) => (
                        <article
                            style={{
                                lineHeight: "4rem",
                                marginBottom: "-1rem",
                            }}
                            key={`${v}__${i}`}
                        >
                            <SubHeading>{`${i + 1}번째 질문`}</SubHeading>
                            <Paragraph>{v}</Paragraph>
                            <Hr />
                        </article>
                    ))}
                </ResultContainer>
            </Form>
        </Layout>
    );
};

InterviewResult.displayName = "InterviewResult";

export default InterviewResult;
