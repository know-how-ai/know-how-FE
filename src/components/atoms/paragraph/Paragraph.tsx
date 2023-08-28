import type { FC, ReactNode } from "react";
import styled from "styled-components";

const Paragraph_ = styled.p`
    line-height: 2.5rem;
    font-size: 1.5rem;
    color: ${(p) => p.theme.color.gray};
    margin: 0.5rem auto;
`;

interface ParagraphProps {
    children?: ReactNode | any;
}

const Paragraph: FC<ParagraphProps> = ({ children }) => {
    return <Paragraph_>{children}</Paragraph_>;
};

export default Paragraph;
