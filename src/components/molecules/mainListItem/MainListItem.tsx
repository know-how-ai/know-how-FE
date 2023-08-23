import { Anchor, Button, Heading } from "@components/atoms";
import { media } from "@components/styles/theme";
import { useUISelector } from "@contexts/uiSlice";
import { type Variants, motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";

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

const MainListItem = ({
    heading,
    href,
    Child,
}: {
    heading: string;
    href: string;
    Child: ({ ...rest }) => JSX.Element;
}) => {
    const { isDarkmode } = useUISelector((state) => state.ui);
    const [hovering, setHovering] = useState(false);

    return (
        <Li
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
        >
            <Anchor href={href}>
                <Button size="infinite" shape="square" color="transparent">
                    <Child
                        act={hovering}
                        strokeWidth={1}
                        isDarkmode={isDarkmode}
                    />
                    <SinkingHeading
                        variants={variants}
                        initial="initial"
                        animate={hovering ? "visible" : "initial"}
                        fontSize={2.5}
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

export default MainListItem;
