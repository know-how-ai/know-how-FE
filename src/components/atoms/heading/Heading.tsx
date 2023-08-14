import type { FC, ReactNode } from "react";
import styled from "styled-components";

interface HeadingStyleProps {
    fontSize?: number;
}

const Heading3 = styled.h3<HeadingStyleProps>`
    font-weight: 600;
    margin: 2rem auto;
    text-align: center;
    font-size: ${(p) => (p.fontSize || 2.5) + "rem"};
    line-height: ${(p) => (p.fontSize || 3) + 0.5 + "rem"};
    word-break: keep-all;
    white-space: nowrap;
`;

interface HeadingProps extends HeadingStyleProps {
    children?: string | ReactNode | any;
}

const Heading: FC<HeadingProps> = ({ children, fontSize }) => {
    return <Heading3 fontSize={fontSize}>{children}</Heading3>;
};

export default Heading;
