import styled from "styled-components";
import { media } from "@components/styles/theme";
import dynamic from "next/dynamic";
import type { NextPage } from "next";
import {
    BriefcaseIcon,
    DocumentIcon,
    Heading,
    PeopleIcon,
    Anchor,
    Button,
} from "@components/atoms";
import { useCallback, useState } from "react";
import { type Variants, motion } from "framer-motion";

const Layout = dynamic(() => import("../layout/Layout"), {
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

const SinkingHeading = motion(Heading);

const variants: Variants = {
    hidden: {
        transform: "translateY(-4rem)",
    },
    visible: {
        transition: { type: "spring", duration: 0.5 },
        transform: "translateY(4rem)",
    },
};

const ListItem = ({
    heading,
    href,
    Child,
}: {
    heading: string;
    href: string;
    Child: ({ ...rest }) => JSX.Element;
}) => {
    const [hovering, setHovering] = useState(false);
    const onMouseEnter = useCallback(() => {
        setHovering(true);
    }, []);
    const onMouseLeave = useCallback(() => {
        setHovering(false);
    }, []);

    return (
        <Li onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <Anchor href={href}>
                <Button
                    size="infinite"
                    boxShadow
                    shape="square"
                    color="transparent"
                >
                    <Child act={hovering} strokeWidth={1} />
                    <SinkingHeading
                        variants={variants}
                        initial="initial"
                        animate={hovering ? "visible" : "initial"}
                        fontSize={2}
                        style={{
                            position: "relative",
                            top: "-4rem",
                            margin: "1rem auto",
                        }}
                    >
                        {heading}
                    </SinkingHeading>
                </Button>
            </Anchor>
        </Li>
    );
};

const Home: NextPage = () => {
    return (
        <Layout title="Home">
            <UList>
                <ListItem
                    Child={DocumentIcon}
                    heading="자소서 첨삭 봇"
                    href="/coverletter"
                />
                <ListItem
                    Child={PeopleIcon}
                    heading="면접 도우미 봇"
                    href="/interview"
                />
                <ListItem
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
