import styled from "styled-components";
import Layout from "../layout/Layout";
import { Anchor, Button } from "@components/atoms";
import { media } from "@components/styles/theme";

const UList = styled.ul`
    display: flex;
    list-style: none;
    justify-content: center;
    gap: 4rem;
    align-items: center;
    margin: 4rem auto;
    width: 100%;

    ${media.mobile} {
        flex-direction: column;
        margin: 1rem auto;
    }
`;

const Li = styled.li`
    width: 100%;
    max-width: 25%;
    ${media.mobile} {
        max-width: 75%;
    }
`;

const ButtonTitle = styled.span`
    display: inline-block;
    text-align: center;
    font-size: 2rem;
    color: ${(p) => p.theme.color.textColor};
    font-weight: 500;
    line-height: 3rem;
`;

export default function Home() {
    return (
        <Layout title="Home">
            <UList>
                <Li>
                    <Button size="infinite" shape="square" color="transparent">
                        <ButtonTitle>자소서 첨삭 봇</ButtonTitle>
                    </Button>
                </Li>
                <Li>
                    <Button size="infinite" shape="square" color="transparent">
                        <ButtonTitle>면접 도우미 봇</ButtonTitle>
                    </Button>
                </Li>
                <Li>
                    <Button size="infinite" shape="square" color="transparent">
                        <ButtonTitle>직업 추천 봇</ButtonTitle>
                    </Button>
                </Li>
            </UList>

            <Anchor href={"/example"}>
                <Button>Go to Example</Button>
            </Anchor>
        </Layout>
    );
}
