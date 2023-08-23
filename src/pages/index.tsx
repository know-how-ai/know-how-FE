import styled from "styled-components";
import { media } from "@components/styles/theme";
// import dynamic from "next/dynamic";
import type { NextPage } from "next";
import { BriefcaseIcon, DocumentIcon, PeopleIcon } from "@components/atoms";
import Layout from "../layout";
import { MainListItem } from "@components/molecules";

const UList = styled.ul`
    display: flex;
    list-style: none;
    justify-content: center;
    gap: 6rem;
    align-items: center;
    margin: 4rem auto;
    width: 100%;

    ${media.mobile} {
        flex-direction: column;
        margin: 1rem auto;
    }
`;

const Home: NextPage = () => {
    return (
        <Layout title="Home" widgets={{ profile: true, theme: true }}>
            <UList>
                <MainListItem
                    Child={DocumentIcon}
                    heading="자소서 코칭 봇"
                    href="/coverletter"
                />
                <MainListItem
                    Child={PeopleIcon}
                    heading="면접 코칭 봇"
                    href="/interview"
                />
                <MainListItem
                    Child={BriefcaseIcon}
                    heading="직업 추천 봇"
                    href="/job"
                />
            </UList>
        </Layout>
    );
};

Home.displayName = "Home";

export default Home;
