import Layout from "../../layout/Layout";
import {
    Badge,
    BadgeContainer,
    Form,
    Heading,
    Hr,
    Paragraph,
    SubHeading,
} from "@components/atoms";
import type { NextPage } from "next";
import { useResultSelector } from "@contexts/resultSlice";
import { ResultContainer } from "@components/organics";

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
                            <article
                                style={{
                                    lineHeight: "4rem",
                                    marginBottom: "-1rem",
                                }}
                                key={`${job}_${i}`}
                            >
                                <SubHeading key={`${job}__${i}`}>
                                    {job}
                                </SubHeading>
                                <Paragraph>{description}</Paragraph>
                                <Hr />
                            </article>
                        )
                    )}
                </ResultContainer>
            </Form>
        </Layout>
    );
};

JobResult.displayName = "JobResult";

export default JobResult;
