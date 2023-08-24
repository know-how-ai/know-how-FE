import { LabelWrapper } from "@components/molecules";
import Layout from "../../layout/Layout";
import { Form, Heading, Input, Textarea } from "@components/atoms";
import type { NextPage } from "next";
import styled from "styled-components";
import { useResultSelector } from "@contexts/resultSlice";
import { ResultContainer } from "@components/organics";

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

const CoverletterResultTitle: string = "자소서 코칭 결과";

const CoverletterResult: NextPage = () => {
    const {
        request: { coverletter: cvRequest },
        response: { coverletter: cvResponse },
    } = useResultSelector(({ result }) => result);

    return (
        <Layout
            title={CoverletterResultTitle}
            widgets={{ profile: true, theme: true }}
        >
            <Heading>{"자소서 코칭 봇"}</Heading>

            <Form
                onSubmit={(e: SubmitEvent) => e.preventDefault()}
                display="flex"
                flexDirection="column"
                alignItems="center"
                gap={2}
            >
                <LabelWrapper label="직업">
                    <Input readOnly value={cvRequest?.job} />
                </LabelWrapper>

                <LabelWrapper label="자기소개서">
                    <Textarea readOnly value={cvRequest?.coverletter} />
                </LabelWrapper>

                <Heading>{CoverletterResultTitle}</Heading>

                <ResultContainer>
                    <SubHeading>긍정적인 점</SubHeading>
                    <article>
                        {cvResponse?.good?.map((v: string, k: number) => (
                            <Parag key={k}>{v}</Parag>
                        ))}
                    </article>
                    <Hr />
                    <SubHeading>아쉬운 점</SubHeading>
                    <article>
                        {cvResponse?.bad?.map((v: string, k: number) => (
                            <Parag key={k}>{v}</Parag>
                        ))}
                    </article>
                    <Hr />
                    <SubHeading>정리</SubHeading>
                    <article>
                        {cvResponse?.overall?.map((v: string, k: number) => (
                            <Parag key={k}>{v}</Parag>
                        ))}
                    </article>
                    <Hr />
                </ResultContainer>
            </Form>
        </Layout>
    );
};

CoverletterResult.displayName = "CoverletterResult";

// export const getServerSideProps: GetServerSideProps<
//     ResultPageProps<ICoverletterForm, ICoverletterRes>
// > = wrapper.getServerSideProps(({ getState }) => async () => {
//     // props에 초기값으로 넘겨줄 수 있다.
//     // 변하는 값이 아니라서 갱신하지 않으면 불변.

//     const {
//         result: { request, response },
//     } = await getState();

//     const props = {
//         request,
//         response,
//     };

//     return {
//         props: await getState(),
//     };
// });

export default CoverletterResult;
