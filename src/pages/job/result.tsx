import Layout from "../../layout/Layout";
import { Badge, Form, Heading } from "@components/atoms";
import type { NextPage } from "next";
import styled from "styled-components";
import { useResultSelector } from "@contexts/resultSlice";
import { ResultContainer } from "@components/organics";

const BadgeContainer = styled.section`
    margin: auto;
    padding: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    width: 100%;
    max-width: 50vw;
`;

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

const JobResultTitle: string = "직업 추천 결과";

const JobResult: NextPage = () => {
    const {
        request: { job: jobRequest },
        response: { job: jobResponse },
    } = useResultSelector(({ result }) => result);

    return (
        <Layout title={JobResultTitle} widgets={{ profile: true, theme: true }}>
            <Heading>{"직업 추천 봇"}</Heading>

            <Form
                onSubmit={(e: SubmitEvent) => e.preventDefault()}
                display="flex"
                flexDirection="column"
                alignItems="center"
                gap={2}
            >
                <BadgeContainer>
                    {jobRequest?.personalities?.map(
                        (personal: string, i: number) => (
                            <Badge active={true} key={i}>
                                {personal}
                            </Badge>
                        )
                    )}
                </BadgeContainer>

                <Heading>{JobResultTitle}</Heading>

                <ResultContainer>
                    {jobResponse?.map(
                        (
                            {
                                job,
                                description,
                            }: { job: string; description: string },
                            i: number
                        ) => (
                            <Article key={`${job}_${i}`}>
                                <SubHeading key={`${job}__${i}`}>
                                    {job}
                                </SubHeading>
                                <Parag>{description}</Parag>
                                <Hr />
                            </Article>
                        )
                    )}
                </ResultContainer>
            </Form>
        </Layout>
    );
};

JobResult.displayName = "JobResult";

export default JobResult;
