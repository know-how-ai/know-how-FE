import { LabelWrapper } from "@components/molecules";
import Layout from "../../layout/Layout";
import { Form, Heading, Input, Textarea } from "@components/atoms";
import type { NextPage } from "next";
import styled from "styled-components";
import { useResultSelector } from "@contexts/resultSlice";
import { ResultContainer } from "@components/organics";

const Article = styled.article`
    line-height: 4rem;
    margin-bottom: -1rem;
`;

const SubHeading = styled.h5`
    font-weight: 600;
    font-size: 2rem;
    margin: 1rem initial;
`;

const Parag = styled.p`
    line-height: 2.5rem;
    font-size: 1.5rem;
    color: ${(p) => p.theme.color.gray};
    margin: 0.5rem auto;
`;

const Hr = styled.hr`
    box-sizing: border-box;
    width: 100%;
    margin: 1rem auto;
    margin-top: 2rem;
`;

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
                        <Article key={`${v}__${i}`}>
                            <SubHeading>{`${i + 1}번째 질문`}</SubHeading>
                            <Parag>{v}</Parag>
                            <Hr />
                        </Article>
                    ))}
                </ResultContainer>
            </Form>
        </Layout>
    );
};

InterviewResult.displayName = "InterviewResult";

export default InterviewResult;
