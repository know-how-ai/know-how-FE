import styled from "styled-components";
import { media } from "@components/styles/theme";
import dynamic from "next/dynamic";
import type { NextPage } from "next";
import {
    BriefcaseIcon,
    DocumentIcon,
    Heading,
    PeopleIcon,
} from "@components/atoms";

const Layout = dynamic(() => import("../layout/Layout"), {
    ssr: true,
    loading: () => <div>로딩 중</div>,
});

const Anchor = dynamic(() => import("@components/atoms/anchor/Anchor"), {
    ssr: true,
    loading: () => <div>로딩 중</div>,
});

const Button = dynamic(() => import("@components/atoms/button/Button"), {
    ssr: true,
    loading: () => <div>로딩 중</div>,
});

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

const Home: NextPage = () => {
    return (
        <Layout title="Home">
            <UList>
                <Li>
                    <Anchor href={"/coverletter"}>
                        <Button
                            size="infinite"
                            shape="square"
                            color="transparent"
                        >
                            <DocumentIcon strokeWidth={1} />
                            <Heading fontSize={2}>자소서 첨삭 봇</Heading>
                        </Button>
                    </Anchor>
                </Li>
                <Li>
                    <Anchor href={"/interview"}>
                        <Button
                            size="infinite"
                            shape="square"
                            color="transparent"
                        >
                            <PeopleIcon strokeWidth={1} />
                            <Heading fontSize={2}>면접 도우미 봇</Heading>
                        </Button>
                    </Anchor>
                </Li>
                <Li>
                    <Anchor href={"/job"}>
                        <Button
                            size="infinite"
                            shape="square"
                            color="transparent"
                        >
                            <BriefcaseIcon strokeWidth={1} />
                            <Heading fontSize={2}>직업 추천 봇</Heading>
                        </Button>
                    </Anchor>
                </Li>
            </UList>
        </Layout>
    );
};

Home.displayName = "Home";

export default Home;
